"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
// Define a Zod schema for the DateTime type
const timeStringSchema = zod_1.z.string().refine((time) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    // example: 09:45, 21:30
    return regex.test(time);
}, {
    message: "Publication date must be in YY-MM-DD format"
});
// Define a Zod schema for the Book model
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        author: zod_1.z.string({
            required_error: 'Author is required',
        }),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
        genre: zod_1.z.string({
            required_error: 'Genre is required',
        }),
        publicationDate: timeStringSchema,
        categoryId: zod_1.z.string({
            required_error: 'CategoryId is required',
        }),
    })
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        genre: zod_1.z.string().optional(),
        publicationDate: timeStringSchema.optional(),
        categoryId: zod_1.z.string().optional(),
    })
});
exports.BookValidation = {
    createBookZodSchema,
    updateBookZodSchema
};
