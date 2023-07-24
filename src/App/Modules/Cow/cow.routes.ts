import express from 'express';
import ZodValidation from '../../../Middleware/zodValidationHandler';
import { createCow, deleteCowById, getAllCows, getCowById, updateCowById } from './cow.controller';
import createCowZodValidation from './cow.zod.validation';
import authPermission from '../../../Middleware/authPermission';
import { ENUM_USER_ROLE } from '../../Constants/enums.user';
const router = express.Router();

router.get('/cows', authPermission(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER), getAllCows);
router.post('/cows', authPermission(ENUM_USER_ROLE.SELLER), ZodValidation(createCowZodValidation), createCow);
router.get('/cows/:id', authPermission(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER), getCowById)
router.patch('/cows/:id', authPermission(ENUM_USER_ROLE.SELLER), updateCowById)
router.delete('/cows/:id', authPermission(ENUM_USER_ROLE.SELLER), deleteCowById);

export const cowRoutes = router;