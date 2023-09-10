import { User } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { userFilterableFields } from "./user.constant";
import { UserService } from "./user.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
	const filters = pick(req.query, userFilterableFields);
	const paginationOptions = pick(req.query, paginationFields);

	const result = await UserService.getAllUsers(
		filters,
		paginationOptions
	);

	sendResponse<Partial<User>[]>(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Users retrieved successfully !',
		data: result
	});
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await UserService.getSingleUser(id);

	sendResponse<Partial<User>>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User getched successfully !',
		data: result,
	});
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const updatedData = req.body;

	const result = await UserService.updateUser(id, updatedData);

	sendResponse<Partial<User>>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'user updated successfully !',
		data: result,
	});
});


const deleteUser = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;

	const result = await UserService.deleteUser(id);

	sendResponse<Partial<User>>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User deleted successfully !',
		data: result,
	});
});

export const UserController = {

	getAllUsers,
	getSingleUser,
	updateUser,
	deleteUser
};