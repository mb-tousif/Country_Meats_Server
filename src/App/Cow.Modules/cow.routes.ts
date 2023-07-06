import express from 'express';
import ZodValidation from '../../Middleware/zodValidationHandler';
import { createCow, deleteCowById, getAllCows, getCowById, updateCowById } from './cow.controller';
import createCowZodValidation from './cow.zod.validation';
import authPermission from '../../Middleware/authPermission';
import { ENUM_USER_ROLE } from '../Constants/enums.user';
const router = express.Router();

router.get('/cows', authPermission(ENUM_USER_ROLE.SELLER), getAllCows);
router.post('/cows', ZodValidation(createCowZodValidation), createCow);
router.get('/cows/:id', getCowById)
router.patch('/cows/:id', updateCowById)
router.delete('/cows/:id', deleteCowById);

export const cowRoutes = router;