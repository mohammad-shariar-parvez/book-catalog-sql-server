import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';



const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER), OrderController.getAllOrder);
router.get('/:orderId', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER), OrderController.getOrderByOrderId);
router.post(
	'/create-order',
	validateRequest(OrderValidation.createOrderZodSchema),
	auth(ENUM_USER_ROLE.CUSTOMER),
	OrderController.createOrder
);




export const OrderRoutes = router;