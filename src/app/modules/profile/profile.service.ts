/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@prisma/client";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { prisma } from "../../../shared/prisma";



const getProfile = async (token: string): Promise<User | null> => {


	const verifiedToken = jwtHelpers.verifyToken(
		token,
		config.jwt.refresh_secret as Secret
	);

	const { userId } = verifiedToken;

	const result = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});
	return result;
};


export const ProfileService = {
	getProfile
}