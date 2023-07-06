import express from 'express';
import ZodValidation from '../../Middleware/zodValidationHandler';
import createOrderZodValidation from './order.zod.validation';
import { createOrder, getAllOrders } from './order.controller';
import authPermission from '../../Middleware/authPermission';
import { ENUM_USER_ROLE } from '../Constants/enums.user';

const router = express.Router();

router.get('/orders', authPermission(ENUM_USER_ROLE.ADMIN), getAllOrders);
router.post('/orders', authPermission(ENUM_USER_ROLE.BUYER), ZodValidation(createOrderZodValidation), createOrder);

export const orderRoutes = router;