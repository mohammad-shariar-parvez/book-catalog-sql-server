import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse, { sendloginResponse } from "../../../shared/sendResponse";
import { ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import { AuthService } from "./auth.service";

const signupUser = catchAsync(async (req: Request, res: Response) => {
	const { ...userData } = req.body;
	const result = await AuthService.signupUser(userData);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'User created successfully!',
		data: result,
	});
});


const signinUser = catchAsync(async (req: Request, res: Response) => {
	const { ...loginData } = req.body;
	const result = await AuthService.signinUser(loginData);
	const cookieOptions = {
		secure: config.env === 'production',
		httpOnly: true,
	};
	res.cookie('refreshToken', refreshToken, cookieOptions);

	sendloginResponse<ILoginUserResponse>(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'User signin successfully!',
		token: result,
	});
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
	const { refreshToken } = req.cookies;
	const result = await AuthService.refreshToken(refreshToken);

	// set refresh token into cookie
	const cookieOptions = {
		secure: config.env === 'production',
		httpOnly: true,
	};

	res.cookie('refreshToken', refreshToken, cookieOptions);

	sendResponse<IRefreshTokenResponse>(res, {
		success: true,
		statusCode: 200,
		message: 'User logged in successfully !',
		data: result,
	});
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
	const user = req.user;
	const { ...passwordData } = req.body;

	await AuthService.changePassword(user, passwordData);

	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: 'Password changed successfully !',
	});
});
export const AuthController = {
	signupUser,
	signinUser,
	refreshToken,
	changePassword,
};
