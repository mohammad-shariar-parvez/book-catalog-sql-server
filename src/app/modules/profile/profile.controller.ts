import { User } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProfileService } from "./profile.service";




const getProfile = catchAsync(async (req: Request, res: Response) => {
	const { refreshToken } = req.cookies;
	const result = await ProfileService.getProfile(refreshToken);
	sendResponse<User>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Profile retrieved successfully !',
		data: result
	});
});



export const ProfileController = {
	getProfile

};