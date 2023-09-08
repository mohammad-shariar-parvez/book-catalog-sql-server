import { IUserSelect } from "./user.interface";

export const userFilterableFields = [
	'searchTerm',
	'role',
];

export const userSearchableFields = [
	'name',
	'email',
	'role',
	'address',
];


export const userSelect: IUserSelect = {
	id: true,
	name: true,
	email: true,
	role: true,
	contactNo: true,
	address: true,
	profileImg: true,
}