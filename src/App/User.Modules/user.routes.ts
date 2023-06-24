import express from 'express';
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from './user.controller';
import ZodValidation from '../../Middleware/zodValidationHandler';
import createUserZodSchema from './user.zod.validation';
const router = express.Router();

router.get('/users', getAllUsers);
router.post('/auth/signup', ZodValidation( createUserZodSchema), createUser);
router.get('/users/:id', getUserById)
router.patch('/users/:id', updateUserById)
router.delete('/users/:id', deleteUserById);

export const userRoutes = router;