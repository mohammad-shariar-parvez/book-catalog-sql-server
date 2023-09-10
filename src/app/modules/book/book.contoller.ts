import { Book } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { bookFilterableFields } from "./book.constant";
import { BookService } from "./book.service";

const createBook = catchAsync(async (req: Request, res: Response) => {
	//console.log(req.body)
	const result = await BookService.createBook(req.body);
	sendResponse<Book>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Book Created Successufully",
		data: result
	})
})


const getAllBook = catchAsync(async (req: Request, res: Response) => {
	const filters = pick(req.query, bookFilterableFields)
	const options = pick(req.query, paginationFields)

	const result = await BookService.getAllBook(filters, options);
	sendResponse<Partial<Book[]>>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Books fetched successfully',
		meta: result.meta,
		data: result.data,
	});
})
const getBooksByCategory = catchAsync(async (req: Request, res: Response) => {
	const { categoryId } = req.params;

	const result = await BookService.getBooksByCategory(categoryId);
	sendResponse<Partial<Book[]>>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Books with associated category data fetched successfully',
		meta: result.meta,
		data: result.data,
	});
})


const getSingleBook = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await BookService.getSingleBook(id);
	sendResponse<Partial<Book>>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Book fetched successfully',
		data: result
	});
})


const updateBook = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await BookService.updateBook(id, req.body);
	sendResponse<Partial<Book>>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Book updated successfully',
		data: result
	});
})


const deleteBook = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await BookService.deleteBook(id);
	sendResponse<Partial<Book>>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Book deleted successfully',
		data: result
	});
})

export const BookController = {
	createBook,
	getAllBook,
	getBooksByCategory,
	getSingleBook,
	updateBook,
	deleteBook
}