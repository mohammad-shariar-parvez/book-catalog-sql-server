import { z } from "zod";

// Define a Zod schema for the DateTime type
const timeStringSchema = z.string().refine(
	(time) => {
		const regex = /^\d{4}-\d{2}-\d{2}$/;
		// example: 09:45, 21:30
		return regex.test(time);
	},
	{
		message: "Publication date must be in YY-MM-DD format"
	}
);

// Define a Zod schema for the Book model
const createBookZodSchema = z.object({
	body: z.object({
		title: z.string({
			required_error: 'Title is required',
		}),
		author: z.string({
			required_error: 'Author is required',
		}),
		price: z.number({
			required_error: 'Price is required',
		}),
		genre: z.string({
			required_error: 'Genre is required',
		}),
		publicationDate: timeStringSchema,
		categoryId: z.string({
			required_error: 'CategoryId is required',
		}),
	})

});
const updateBookZodSchema = z.object({
	body: z.object({
		title: z.string().optional(),
		author: z.string().optional(),
		price: z.number().optional(),
		genre: z.string().optional(),
		publicationDate: timeStringSchema.optional(),
		categoryId: z.string().optional(),
	})
});

export const BookValidation = {
	createBookZodSchema,
	updateBookZodSchema
}