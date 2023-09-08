import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.contoller';
import { CategoryValidation } from './category.validation';


const router = express.Router();

router.get('/', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getSingleCategory);

router.post(
	'/create-category',
	validateRequest(CategoryValidation.createCategoryZodSchema),
	CategoryController.createCategory
);


router.patch(
	'/:id',
	validateRequest(CategoryValidation.updateCategoryZodSchema),
	auth(ENUM_USER_ROLE.ADMIN),
	CategoryController.updateCategory
);

router.delete(
	'/:id',
	auth(ENUM_USER_ROLE.ADMIN),
	CategoryController.deleteCategory
);

export const CategoryRoutes = router;
