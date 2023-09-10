import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.service";


const createOrder = catchAsync(async (req: Request, res: Response) => {
	//console.log(req.body)
	const { refreshToken } = req.cookies;
	const result = await OrderService.createOrder(req.body, refreshToken);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Order Fetched Successufully",
		data: result
	})
})


const getAllOrder = catchAsync(async (req: Request, res: Response) => {
	const { refreshToken } = req.cookies;
	const result = await OrderService.getAllOrder(refreshToken);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Orders retrieved successfully !',
		data: result
	});
});
const getOrderByOrderId = catchAsync(async (req: Request, res: Response) => {
	const { refreshToken } = req.cookies;
	const orderId = req.params.orderId;
	const result = await OrderService.getOrderByOrderId(refreshToken, orderId);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Order retrieved successfully !',
		data: result
	});
});

// const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
// 	const id = req.params.id;
// 	const result = await OrderService.getSingleOrder(id);

// 	sendResponse<Partial<Order>>(res, {
// 		statusCode: httpStatus.OK,
// 		success: true,
// 		message: 'Order retrieved successfully !',
// 		data: result,
// 	});
// });






export const OrderController = {
	createOrder,
	getAllOrder,
	getOrderByOrderId
	// getSingleOrder,

};