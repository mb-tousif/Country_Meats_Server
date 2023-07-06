import express from 'express';
import ZodValidation from '../../Middleware/zodValidationHandler';
import createUserZodSchema from '../User.Modules/user.zod.validation';
import { createUser, loginAuth, refreshToken } from './auth.controller';
import {authLoginZodSchema, refreshTokenZodSchema} from './auth.zod.validation';

const router = express.Router();

router.post('/signup', ZodValidation( createUserZodSchema), createUser);
router.post('/login', ZodValidation( authLoginZodSchema), loginAuth);
router.post('/refresh-token', ZodValidation( refreshTokenZodSchema), refreshToken);

export const authRoutes = router;