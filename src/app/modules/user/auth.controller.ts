import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import { AuthService } from "./auth.service";

const signupUser = catchAsync(async (req: Request, res: Response) => {
	const { ...userData } = req.body;
	const result = await AuthService.signupUser(userData);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User Signup in successfully !',
		data: result,
	});
});


const signinUser = catchAsync(async (req: Request, res: Response) => {
	const { ...loginData } = req.body;
	const result = await AuthService.signinUser(loginData);
	const { refreshToken, ...others } = result;
	const cookieOptions = {
		secure: config.env === 'production',
		httpOnly: true,
	};
	res.cookie('refreshToken', refreshToken, cookieOptions);

	sendResponse<ILoginUserResponse>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User Signin in successfully !',
		data: others,
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
		statusCode: 200,
		success: true,
		message: 'User logged in successfully !',
		data: result,
	});
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
	const user = req.user;
	const { ...passwordData } = req.body;

	await AuthService.changePassword(user, passwordData);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: 'Password changed successfully !',
	});
});
export const AuthController = {
	signupUser,
	signinUser,
	refreshToken,
	changePassword,
};
