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
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req.body)
    const { refreshToken } = req.cookies;
    const result = yield order_service_1.OrderService.createOrder(req.body, refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order Fetched Successufully",
        data: result
    });
}));
const getAllOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield order_service_1.OrderService.getAllOrder(refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders retrieved successfully !',
        data: result
    });
}));
const getOrderByOrderId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const orderId = req.params.orderId;
    const result = yield order_service_1.OrderService.getOrderByOrderId(refreshToken, orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order retrieved successfully !',
        data: result
    });
}));
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
exports.OrderController = {
    createOrder,
    getAllOrder,
    getOrderByOrderId
    // getSingleOrder,
};
