"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_contoller_1 = require("./category.contoller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.get('/', category_contoller_1.CategoryController.getAllCategory);
router.get('/:id', category_contoller_1.CategoryController.getSingleCategory);
router.post('/create-category', (0, validateRequest_1.default)(category_validation_1.CategoryValidation.createCategoryZodSchema), category_contoller_1.CategoryController.createCategory);
router.patch('/:id', (0, validateRequest_1.default)(category_validation_1.CategoryValidation.updateCategoryZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_contoller_1.CategoryController.updateCategory);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_contoller_1.CategoryController.deleteCategory);
exports.CategoryRoutes = router;
