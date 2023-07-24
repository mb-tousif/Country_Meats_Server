import express from 'express';
import { createUser, loginAuth, refreshToken } from './auth.controller';
import {authLoginZodSchema, refreshTokenZodSchema} from './auth.zod.validation';
import ZodValidation from '../../../Middleware/zodValidationHandler';
import createUserZodSchema from '../User/user.zod.validation';

const router = express.Router();

router.post('/signup', ZodValidation( createUserZodSchema), createUser);
router.post('/login', ZodValidation( authLoginZodSchema), loginAuth);
router.post('/refresh-token', ZodValidation( refreshTokenZodSchema), refreshToken);

export const authRoutes = router;