/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@prisma/client";
import { IUser } from "../../../interfaces/common";
import { prisma } from "../../../shared/prisma";



const getProfile = async (user: IUser): Promise<User | null> => {
	const { userId } = user;
	const result = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});
	return result;
};


export const ProfileService = {
	getProfile
};