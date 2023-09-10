import { z } from 'zod';



// Define a schema for the orderedBooks array
const createOrderZodSchema = z.object({
	body: z.object({
		orderedBooks: z.array(
			z.object({
				bookId: z.string({
					required_error: 'Book ID is required'
				}),
				quantity: z.number({
					required_error: 'Quantity is required'
				}).int().min(1), // Quantity must be an integer and greater than or equal to 1
			})
		)

	})
})

export const OrderValidation = {
	createOrderZodSchema
}

