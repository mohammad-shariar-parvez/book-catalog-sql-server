"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = require("../../../shared/prisma");
const utils_1 = require("../../../shared/utils");
const createOrder = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderedBooks } = payload;
    let verifiedToken = null;
    verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    if (verifiedToken.role != "customer") {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Role. Only Customer can place an order.');
    }
    const { userId } = verifiedToken;
    const newOrder = yield prisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield transactionClient.order.create({
            data: {
                userId
            }
        });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Unable to create order");
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
            yield (0, utils_1.asyncForEach)(orderedBooks, (OrderedBookItem) => __awaiter(void 0, void 0, void 0, function* () {
                const createOrderResult = yield transactionClient.orderedBook.create({
                    data: {
                        orderId: result.id,
                        bookId: OrderedBookItem.bookId,
                        quantity: OrderedBookItem.quantity,
                    }
                });
                console.log("createPrerequisite", createOrderResult);
            }));
        }
        return result;
    }));
    if (newOrder) {
        const responseData = yield prisma_1.prisma.order.findUniqueOrThrow({
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
        });
        return responseData;
    }
    // return newOrder------
    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Unable to create order");
});
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
const getAllOrder = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    const { userId } = verifiedToken;

    if (verifiedToken.role == "customer") {
        const result = yield prisma_1.prisma.order.findMany({
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
        const result = yield prisma_1.prisma.order.findMany({
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
});
const getOrderByOrderId = (token, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    const { userId } = verifiedToken;
    console.log("eeeeee", verifiedToken);
    if (verifiedToken.role == "customer") {
        const result = yield prisma_1.prisma.order.findUnique({
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
        if ((result === null || result === void 0 ? void 0 : result.userId) != userId) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You Do not have any order with this order id');
        }
        return result;
    }
    else if (verifiedToken.role == "admin") {
        const result = yield prisma_1.prisma.order.findUniqueOrThrow({
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
});
exports.OrderService = {
    createOrder,
    getAllOrder,
    getOrderByOrderId
};
