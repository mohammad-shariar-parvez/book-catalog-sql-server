"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.getAllOrder);
router.get('/:orderId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.getOrderByOrderId);
router.post('/create-order', (0, validateRequest_1.default)(order_validation_1.OrderValidation.createOrderZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.createOrder);
exports.OrderRoutes = router;
