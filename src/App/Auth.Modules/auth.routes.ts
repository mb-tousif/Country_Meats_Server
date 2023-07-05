import express from 'express';
import ZodValidation from '../../Middleware/zodValidationHandler';
import createUserZodSchema from '../User.Modules/user.zod.validation';
import { createUser } from './auth.controller';

const router = express.Router();

router.post('/signup', ZodValidation( createUserZodSchema), createUser);

export const authRoutes = router;