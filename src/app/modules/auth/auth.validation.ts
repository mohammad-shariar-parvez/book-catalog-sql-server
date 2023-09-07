import { z } from 'zod';

const signupZodSchema = z.object({
	body: z.object({

		name: z.string({
			required_error: 'Name is required',
		}),
		email: z.string({
			required_error: 'Email is required',
		}),
		password: z.string({
			required_error: 'Password is required',
		}),
		contactNo: z.string({
			required_error: 'Contact no is required',
		}),
		address: z.string({
			required_error: 'Address  is required',
		}),

	}),
});

const signinZodSchema = z.object({
	body: z.object({
		email: z.string({
			required_error: 'email is required',
		}),
		password: z.string({
			required_error: 'Password is required',
		}),
	}),
});

const refreshTokenZodSchema = z.object({
	cookies: z.object({
		refreshToken: z.string({
			required_error: 'Refresh Token is required',
		}),
	}),
});

const changePasswordZodSchema = z.object({
	body: z.object({
		oldPassword: z.string({
			required_error: 'Old password  is required',
		}),
		newPassword: z.string({
			required_error: 'New password  is required',
		}),
	}),
});

export const AuthValidation = {
	signupZodSchema,
	signinZodSchema,
	refreshTokenZodSchema,
	changePasswordZodSchema
};
