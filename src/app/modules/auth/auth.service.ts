import { User } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { bcryptHelpers } from "../../../helpers/bycryptHelpers";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { prisma } from "../../../shared/prisma";
import { userSelect } from "../user/user.constant";
import { IChangePassword, ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";

const signupUser = async (
	userData: User
): Promise<Partial<User | null>> => {
	const { password, ...userWithoutPassword } = userData;

	const hashedPassword = await bcryptHelpers.hashedPassword(password)

	const user = await prisma.user.create({
		data: {
			...userWithoutPassword,
			password: await hashedPassword,
		},
		select: userSelect
	});
	// console.log("user signup", result);
	return user;

};

const signinUser = async (
	payload: ILoginUser
): Promise<ILoginUserResponse> => {
	const { email, password } = payload;

	const isUserExist = await prisma.user.findUnique({
		where: {
			email
		}
	});

	if (!isUserExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
	}

	if (
		isUserExist.password &&
		!(await bcryptHelpers.isPasswordMatched(password, isUserExist.password))
	) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
	}
	//create access token & refresh token
	const { id: userId, role, email: useEmail } = isUserExist;
	const accessToken = jwtHelpers.createToken(
		{ userId, role, useEmail },
		config.jwt.secret as Secret,
		config.jwt.expires_in as string
	);
	// const refreshToken = jwtHelpers.createToken(
	// 	{ userId, role, useEmail },
	// 	config.jwt.refresh_secret as Secret,
	// 	config.jwt.refresh_expires_in as string
	// );

	return accessToken
	// console.log("user signup", result);
	// console.log("login", isUserExist);


};


const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
	//verify token
	let verifiedToken = null;
	try {
		verifiedToken = jwtHelpers.verifyToken(
			token,
			config.jwt.refresh_secret as Secret
		);
	} catch (err) {
		throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
	}

	const { userId } = verifiedToken;

	// case- user deleted but he has refresh token
	// checking deleted user's refresh token


	const isUserExist = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});
	if (!isUserExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
	}
	//generate new token
	const newAccessToken = jwtHelpers.createToken(
		{
			id: isUserExist.id,
			role: isUserExist.role,
			email: isUserExist.email
		},
		config.jwt.secret as Secret,
		config.jwt.expires_in as string
	);

	return {
		accessToken: newAccessToken,
	};
};


const changePassword = async (
	user: JwtPayload | null,
	payload: IChangePassword
): Promise<User> => {
	const { oldPassword, newPassword } = payload;

	// // checking is user exist
	// const isUserExist = await User.isUserExist(user?.userId);

	// alternative way

	const isUserExist = await prisma.user.findUnique({
		where: {
			id: user?.id
		}
	});

	if (!isUserExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
	}

	// checking old password
	if (
		isUserExist.password &&
		!(await bcryptHelpers.isPasswordMatched(oldPassword, isUserExist.password))
	) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
	}

	// hash password before saving
	const hashedPassword = await bcryptHelpers.hashedPassword(newPassword)
	try {
		const updateUser = await prisma.user.update({
			where: {
				id: user?.id
			},
			data: {
				password: hashedPassword
			}
		})
		return updateUser
	} catch (error) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Password update failed');
	}

};

export const AuthService = {
	signupUser,
	signinUser,
	refreshToken,
	changePassword,
};
