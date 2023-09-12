/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "../../../interfaces/common";
import { prisma } from "../../../shared/prisma";
import { asyncForEach } from "../../../shared/utils";
import { IOrderCreateData, IOrderedBook } from "./order.interface";


const createOrder = async (payload: IOrderCreateData, user: IUser): Promise<any> => {
	const { userId, role } = user
	const { orderedBooks } = payload;




	if (role != "customer") {
		throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Role. Only Customer can place an order.');
	}




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
		const responseData = await prisma.order.findUniqueOrThrow({
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
const getAllOrder = async (user: IUser): Promise<any[]> => {
	const { userId, role } = user
	console.log("service user", user);


	if (role == "customer") {
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
const getOrderByOrderId = async (user: IUser, orderId: string): Promise<any | null> => {

	const { userId, role } = user




	if (role == "customer") {
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
	else if (role == "admin") {
		const result = await prisma.order.findUniqueOrThrow({
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

}