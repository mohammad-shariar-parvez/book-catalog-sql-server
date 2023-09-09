import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.contoller';
import { BookValidation } from './book.validation';


const router = express.Router();

router.get('/', BookController.getAllBook);
router.get('/:categoryId/category', BookController.getSingleBook);
router.get('/:id', BookController.getSingleBook);

router.post(
	'/create-Book',
	validateRequest(BookValidation.createBookZodSchema),
	BookController.createBook
);


router.patch(
	'/:id',
	validateRequest(BookValidation.updateBookZodSchema),
	auth(ENUM_USER_ROLE.ADMIN),
	BookController.updateBook
);

router.delete(
	'/:id',
	auth(ENUM_USER_ROLE.ADMIN),
	BookController.deleteBook
);

export const BookRoutes = router;
