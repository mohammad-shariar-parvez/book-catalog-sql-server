import { Prisma, User } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { userSearchableFields, userSelect } from "./user.constant";
import { IUserFilters } from "./user.interface";

const getAllUsers = async (
	filters: IUserFilters,
	paginationOptions: IPaginationOptions
): Promise<Partial<User>[]> => {

	// Extract searchTerm to implement search query
	const { searchTerm, ...filtersData } = filters;
	const { size, skip } =
		paginationHelpers.calculatePagination(paginationOptions);

	const andConditions = [];
	// Search needs $OR for searching in specified fields
	if (searchTerm) {
		andConditions.push({
			OR: userSearchableFields.map(field => ({
				[field]: {
					contains: searchTerm,
					mode: 'insensitive',
				},
			}))
		})
	}
	// Filters needs $and to fullfill all the conditions
	if (Object.keys(filtersData).length) {
		andConditions.push({
			AND: Object.entries(filtersData).map(([field, value]) => ({
				[field]: {
					equals: value,
				},
			})),
		});
	}

	const whereConditions: Prisma.UserWhereInput =
		andConditions.length > 0 ? { AND: andConditions } : {};


	const result = await prisma.user.findMany({
		where: whereConditions,
		select: userSelect,
		skip,
		take: size,
	});

	return result;
};


const getSingleUser = async (id: string): Promise<Partial<User> | null> => {
	const result = await prisma.user.findUniqueOrThrow({
		where: {
			id,
		},
		select: userSelect
	});
	console.log(result);

	return result;
};

const updateUser = async (id: string, payload: Partial<User>): Promise<Partial<User> | null> => {
	const result = await prisma.user.update({
		where: {
			id,
		},
		data: payload,
		select: userSelect
	});

	return result;
};
const deleteUser = async (id: string): Promise<Partial<User> | null> => {
	const result = await prisma.user.delete({
		where: {
			id,
		},
		select: userSelect
	});
	return result;
};



export const UserService = {
	getAllUsers,
	getSingleUser,
	updateUser,
	deleteUser
}