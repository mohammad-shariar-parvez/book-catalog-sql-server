import { ENUM_USER_ROLE } from "../../../enums/user";

export type ILoginUserResponse = string;


export type IRefreshTokenResponse = {
	accessToken: string;
};

export type IVerifiedLoginUser = {
	userId: string;
	role: ENUM_USER_ROLE;
};

export type IChangePassword = {
	oldPassword: string;
	newPassword: string;
};

export type ILoginUser = {
	email: string;
	password: string;
};
