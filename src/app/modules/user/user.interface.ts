export type IUserFilters = {
	searchTerm?: string | undefined
	role?: string
}

export type IUserSelect = {
	id: boolean;
	name: boolean;
	email: boolean;
	role: boolean;
	contactNo: boolean;
	address: boolean;
	profileImg: boolean;
}