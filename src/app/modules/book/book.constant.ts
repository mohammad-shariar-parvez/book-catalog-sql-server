export const bookFilterableFields: string[] = ['search', 'minPrice', 'maxPrice', 'category']
export const bookSearchableFields: string[] = ['title', 'author', 'genre']

export const bookRelationalFileds = ['category']

export const bookConditionalFileds = ['minPrice', 'maxPrice']
export const bookConditionalFiledsMapper: { [key: string]: string } = {
	minPrice: 'gte',
	maxPrice: 'lte'
}