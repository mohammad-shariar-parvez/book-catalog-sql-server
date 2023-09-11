"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookConditionalFiledsMapper = exports.bookConditionalFileds = exports.bookRelationalFileds = exports.bookSearchableFields = exports.bookFilterableFields = void 0;
exports.bookFilterableFields = ['search', 'minPrice', 'maxPrice', 'category'];
exports.bookSearchableFields = ['title', 'author', 'genre'];
exports.bookRelationalFileds = ['category'];
exports.bookConditionalFileds = ['minPrice', 'maxPrice'];
exports.bookConditionalFiledsMapper = {
    minPrice: 'gte',
    maxPrice: 'lte'
};
