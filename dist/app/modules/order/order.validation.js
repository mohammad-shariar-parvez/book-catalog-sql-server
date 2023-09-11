"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
// Define a schema for the orderedBooks array
const createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        orderedBooks: zod_1.z.array(zod_1.z.object({
            bookId: zod_1.z.string({
                required_error: 'Book ID is required'
            }),
            quantity: zod_1.z.number({
                required_error: 'Quantity is required'
            }).int().min(1), // Quantity must be an integer and greater than or equal to 1
        }))
    })
});
exports.OrderValidation = {
    createOrderZodSchema
};
