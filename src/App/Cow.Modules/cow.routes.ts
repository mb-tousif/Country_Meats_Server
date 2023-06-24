import express from 'express';
import ZodValidation from '../../Middleware/zodValidationHandler';
import { createCow, deleteCowById, getAllCows, getCowById, updateCowById } from './cow.controller';
import createCowZodValidation from './cow.zod.validation';
const router = express.Router();

router.get('/cows', getAllCows);
router.post('/cows', ZodValidation(createCowZodValidation), createCow);
router.get('/cows/:id', getCowById)
router.patch('/cows/:id', updateCowById)
router.delete('/cows/:id', deleteCowById);

export const cowRoutes = router;