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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_1 = require("../../../shared/prisma");
const createCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield prisma_1.prisma.category.create({
        data: payload
    });
    return category;
});
const getAllCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const allCategory = yield prisma_1.prisma.category.findMany({});
    return allCategory;
});
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleCategory = yield prisma_1.prisma.category.findUniqueOrThrow({
        where: {
            id
        }
    });
    console.log(singleCategory);
    return singleCategory;
});
const updateCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCategory = yield prisma_1.prisma.category.update({
        where: {
            id,
        },
        data: payload,
    });
    return updatedCategory;
});
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCategory = yield prisma_1.prisma.category.delete({
        where: {
            id,
        },
    });
    return deletedCategory;
});
exports.CategoryService = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory
};
