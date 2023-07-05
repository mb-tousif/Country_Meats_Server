import express from 'express';
import ZodValidation from '../../Middleware/zodValidationHandler';
import createUserZodSchema from '../User.Modules/user.zod.validation';
import { createUser, loginAuth } from './auth.controller';
import {authLoginZodSchema} from './auth.zod.validation';

const router = express.Router();

router.post('/signup', ZodValidation( createUserZodSchema), createUser);
router.post('/login', ZodValidation( authLoginZodSchema), loginAuth);

export const authRoutes = router;