import { Router } from 'express';
import { signup, login } from '../controllers/Auth';
import asyncHandler from '../middlewares/asyncHandler.js';
// import {
//   registerValidatar,
//   loginValidator
// } from '../middlewares/validations/validateUser';

const router = new Router();

router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));

export default router;
