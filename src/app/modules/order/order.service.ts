/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { prisma } from "../../../shared/prisma";
import { asyncForEach } from "../../../shared/utils";
import { IOrderCreateData, IOrderedBook } from "./order.interface";


const createOrder = async (payload: IOrderCreateData, token: string): Promise<any> => {
	const { orderedBooks } = payload;
	let verifiedToken = null;

	verifiedToken = jwtHelpers.verifyToken(
		token,
		config.jwt.refresh_secret as Secret
	);

	if (verifiedToken.role != "customer") {
		throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Role. Only Customer can place an order.');
	}
	const { userId } = verifiedToken;




	const newOrder = await prisma.$transaction(async (transactionClient) => {
		const result = await transactionClient.order.create({
			data: {
				userId
			}
		})


		if (!result) {
			throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create order")
		}

		if (orderedBooks && orderedBooks.length > 0) {

			// orderedBooks.map(async (order) => {
			// 	const createdOrderdBooks = await transactionClient.orderedBook.create({
			// 		data: {
			// 			orderId: result.id,
			// 			bookId: order.bookId,
			// 			quantity: order.quantity,
			// 		},
			// 	});

			// 	console.log(createdOrderdBooks);
			// });

			//------
			await asyncForEach(
				orderedBooks,
				async (OrderedBookItem: IOrderedBook) => {

					const createOrderResult = await transactionClient.orderedBook.create({
						data: {
							orderId: result.id,
							bookId: OrderedBookItem.bookId,
							quantity: OrderedBookItem.quantity,

						}
					})
					console.log("createPrerequisite", createOrderResult)
				}
			)
		}

		return result;
	})


	if (newOrder) {
		const responseData = await prisma.order.findUnique({
			where: {
				id: newOrder.id
			},
			include: {
				orderedBooks: {
					select: {
						bookId: true,
						quantity: true
					}
				},

			}
		})

		return responseData;
	}
	// return newOrder------

	throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create order")
}



// const getAllOrder = async (

// ): Promise<any[]> => {

// 	const result = await prisma.order.findMany({

// 		include: {
// 			orderedBooks: {
// 				select: {
// 					bookId: true,
// 					quantity: true
// 				}
// 			},

// 		}
// 	});

// 	return result;
// };
const getAllOrder = async (token: string): Promise<any[]> => {


	const verifiedToken = jwtHelpers.verifyToken(
		token,
		config.jwt.refresh_secret as Secret
	);

	const { userId } = verifiedToken;
	console.log("FFFFF", verifiedToken);

	if (verifiedToken.role == "customer") {
		const result = await prisma.order.findMany({
			where: {
				userId
			},
			include: {
				orderedBooks: {
					select: {
						bookId: true,
						quantity: true
					}
				},
			}
		});
		return result;
	}
	else {
		const result = await prisma.order.findMany({
			include: {
				orderedBooks: {
					select: {
						bookId: true,
						quantity: true
					}
				},
			}
		});
		return result;
	}

};
const getOrderByOrderId = async (token: string, orderId: string): Promise<any | null> => {


	const verifiedToken = jwtHelpers.verifyToken(
		token,
		config.jwt.refresh_secret as Secret
	);

	const { userId } = verifiedToken;

	console.log("eeeeee", verifiedToken);


	if (verifiedToken.role == "customer") {
		const result = await prisma.order.findUnique({
			where: {
				id: orderId,
				userId
			},
			include: {
				orderedBooks: {
					select: {
						bookId: true,
						quantity: true
					}
				},
			}
		});

		if (result?.userId != userId) {
			throw new ApiError(httpStatus.FORBIDDEN, 'You Do not have any order with this order id');
		}

		return result;

	}
	else if (verifiedToken.role == "admin") {
		const result = await prisma.order.findUnique({
			where: {
				id: orderId,
			},
			include: {
				orderedBooks: {
					select: {
						bookId: true,
						quantity: true
					}
				},
			}
		});
		return result;
	}

};





export const OrderService = {
	createOrder,
	getAllOrder,
	getOrderByOrderId
	// getSingleUser,

}