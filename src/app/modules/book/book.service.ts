import { Book, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { bookConditionalFileds, bookConditionalFiledsMapper, bookRelationalFileds, bookSearchableFields } from "./book.constant";
import { IBookFilterableFields } from "./book.interface";

const createBook = async (payload: Book): Promise<Book> => {
	const book = await prisma.book.create({
		data: payload,
		include: {
			category: true
		}
	})
	return book
}

const getBooksByCategory = async (
	categoryId: string
): Promise<IGenericResponse<Book[]>> => {
	const { size, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination({});


	const allBook = await prisma.book.findMany({
		include: {
			category: true,
		},
		where: {
			categoryId
		},
		skip,
		take: size,
		orderBy: { [sortBy]: sortOrder },
	})

	const total = await prisma.book.count({
		where: {
			categoryId
		},
	});
	const totalPage = Math.ceil(total / size)
	return {
		meta: {
			total,
			page,
			size,
			totalPage
		},
		data: allBook,
	};
}
const getAllBook = async (
	filters: IBookFilterableFields,
	options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
	const { size, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);
	const { search, ...filtersData } = filters;
	const andConditions = [];

	if (search) {
		andConditions.push({
			OR: bookSearchableFields.map((field) => ({
				[field]: {
					contains: search,
					mode: 'insensitive'
				}
			}))
		});
	}

	if (Object.keys(filtersData).length > 0) {
		andConditions.push({
			AND: Object.entries(filtersData).map(([key, value]) => {
				if (bookRelationalFileds.includes(key)) {
					return {
						[key]: {
							id: value
						}
					};
				}
				else if (bookConditionalFileds.includes(key)) {
					const amount = Number(value)
					return {
						price: {
							[bookConditionalFiledsMapper[key]]: amount
						}
					}
				}
				else {
					return {
						[key]: {
							equals: value
						}
					};
				}
			})
		});
	}




	const whereConditions: Prisma.BookWhereInput =
		andConditions.length > 0 ? { AND: andConditions } : {};
	// console.log("WHERE CONDITION", whereConditions);

	const allBook = await prisma.book.findMany({
		include: {
			category: true,
		},
		where: whereConditions,
		skip,
		take: size,
		orderBy: { [sortBy]: sortOrder },
	})
	const total = await prisma.book.count({
		where: whereConditions,
	});
	const totalPage = Math.ceil(total / size)
	return {
		meta: {
			total,
			page,
			size,
			totalPage
		},
		data: allBook,
	};
}


const getSingleBook = async (id: string): Promise<Book | null> => {
	const singleBook = await prisma.book.findUniqueOrThrow({
		where: {
			id
		}
	})
	return singleBook
}

const updateBook = async (id: string, payload: Partial<Book>): Promise<Book | null> => {
	const updatedBook = await prisma.book.update({
		where: {
			id,
		},
		data: payload

	});
	return updatedBook;
}

const deleteBook = async (id: string): Promise<Book | null> => {
	const deletedBook = await prisma.book.delete({
		where: {
			id,
		}

	});
	return deletedBook;
}

export const BookService = {
	createBook,
	getBooksByCategory,
	getAllBook,
	getSingleBook,
	updateBook,
	deleteBook
}