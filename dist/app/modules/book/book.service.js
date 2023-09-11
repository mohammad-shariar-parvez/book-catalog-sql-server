"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const book_constant_1 = require("./book.constant");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.prisma.book.create({
        data: payload,
        include: {
            category: true
        }
    });
    return book;
});
const getBooksByCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination({});
    const allBook = yield prisma_1.prisma.book.findMany({
        include: {
            category: true,
        },
        where: {
            categoryId
        },
        skip,
        take: size,
        orderBy: { [sortBy]: sortOrder },
    });
    const total = yield prisma_1.prisma.book.count({
        where: {
            categoryId
        },
    });
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            total,
            page,
            size,
            totalPage
        },
        data: allBook,
    };
});
const getAllBook = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search } = filters, filtersData = __rest(filters, ["search"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: book_constant_1.bookSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive'
                }
            }))
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.entries(filtersData).map(([key, value]) => {
                if (book_constant_1.bookRelationalFileds.includes(key)) {
                    return {
                        [key]: {
                            id: value
                        }
                    };
                }
                else if (book_constant_1.bookConditionalFileds.includes(key)) {
                    const amount = Number(value);
                    return {
                        price: {
                            [book_constant_1.bookConditionalFiledsMapper[key]]: amount
                        }
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: value
                        }
                    };
                }
            })
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    // console.log("WHERE CONDITION", whereConditions);
    const allBook = yield prisma_1.prisma.book.findMany({
        include: {
            category: true,
        },
        where: whereConditions,
        skip,
        take: size,
        orderBy: { [sortBy]: sortOrder },
    });
    const total = yield prisma_1.prisma.book.count({
        where: whereConditions,
    });
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            total,
            page,
            size,
            totalPage
        },
        data: allBook,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleBook = yield prisma_1.prisma.book.findUniqueOrThrow({
        where: {
            id
        }
    });
    return singleBook;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield prisma_1.prisma.book.update({
        where: {
            id,
        },
        data: payload
    });
    return updatedBook;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBook = yield prisma_1.prisma.book.delete({
        where: {
            id,
        }
    });
    return deletedBook;
});
exports.BookService = {
    createBook,
    getBooksByCategory,
    getAllBook,
    getSingleBook,
    updateBook,
    deleteBook
};
