import bcrypt from 'bcrypt';
import config from '../config';


const isPasswordMatched = async function (
	givenPassword: string,
	savedPassword: string
): Promise<boolean> {
	return await bcrypt.compare(givenPassword, savedPassword);
};

const hashedPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(
		password,
		Number(config.bycrypt_salt_rounds));
}

export const bcryptHelpers = {
	isPasswordMatched,
	hashedPassword
}
