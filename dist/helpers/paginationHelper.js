"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelpers = void 0;
const calculatePagination = (options) => {
    const page = Number(options.page || 1);
    const size = Number(options.size || 10);
    const skip = (page - 1) * size;
    const sortBy = options.sortBy || 'price';
    const sortOrder = options.sortOrder || 'asc';
    return {
        page,
        size,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.paginationHelpers = {
    calculatePagination,
};
