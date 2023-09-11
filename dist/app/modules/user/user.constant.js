"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSelect = exports.userSearchableFields = exports.userFilterableFields = void 0;
exports.userFilterableFields = [
    'searchTerm',
    'role',
];
exports.userSearchableFields = [
    'name',
    'email',
    'role',
    'address',
];
exports.userSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
    contactNo: true,
    address: true,
    profileImg: true,
};
