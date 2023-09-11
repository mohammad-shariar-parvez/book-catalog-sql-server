import { Category } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

const createCategory = async (payload: Category): Promise<Category> => {
	const category = await prisma.category.create({
		data: payload
	})
	return category
}

const getAllCategory = async (): Promise<Category[]> => {
	const allCategory = await prisma.category.findMany({})
	return allCategory
}

const getSingleCategory = async (id: string): Promise<Category | null> => {
	const singleCategory = await prisma.category.findUniqueOrThrow({
		where: {
			id
		}
	})
	console.log(singleCategory);

	return singleCategory
}

const updateCategory = async (id: string, payload: Partial<Category>): Promise<Category | null> => {
	const updatedCategory = await prisma.category.update({
		where: {
			id,
		},
		data: payload,

	});
	return updatedCategory;
}

const deleteCategory = async (id: string): Promise<Category | null> => {
	const deletedCategory = await prisma.category.delete({
		where: {
			id,
		},

	});
	return deletedCategory;
}

export const CategoryService = {
	createCategory,
	getAllCategory,
	getSingleCategory,
	updateCategory,
	deleteCategory
}