import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
	'/signin',
	validateRequest(AuthValidation.loginZodSchema),
	AuthController.signupUser
);
router.post(
	'/signup',
	validateRequest(AuthValidation.loginZodSchema),
	AuthController.signinUser
);

// router.post(
// 	'/refresh-token',
// 	validateRequest(AuthValidation.refreshTokenZodSchema),
// 	AuthController.refreshToken
// );

// router.post(
// 	'/change-password',
// 	validateRequest(AuthValidation.changePasswordZodSchema),
// 	auth(
// 		ENUM_USER_ROLE.ADMIN,
// 		ENUM_USER_ROLE.CUSTOMER,
// 	),
// 	AuthController.changePassword
// );

export const AuthRoutes = router;
