
export type IOrderedBook = {
	bookId: string;
	quantity: number;
}
export type IOrderCreateData = {
	orderedBooks: IOrderedBook[]
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