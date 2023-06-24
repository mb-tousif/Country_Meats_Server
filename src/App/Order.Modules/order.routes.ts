import express from 'express';
import ZodValidation from '../../Middleware/zodValidationHandler';
import createOrderZodValidation from './order.zod.validation';
import { createOrder, getAllOrders } from './order.controller';

const router = express.Router();

router.get('/orders', getAllOrders);
router.post('/orders', ZodValidation(createOrderZodValidation), createOrder);

export const orderRoutes = router;