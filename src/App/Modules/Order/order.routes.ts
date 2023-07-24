import express from 'express';
import ZodValidation from '../../../Middleware/zodValidationHandler';
import createOrderZodValidation from './order.zod.validation';
import { createOrder, getAllOrders, getOrderById } from './order.controller';
import authPermission from '../../../Middleware/authPermission';
import { ENUM_USER_ROLE } from '../../Constants/enums.user';

const router = express.Router();

router.get('/orders', authPermission(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER), getAllOrders);
router.get('/orders/:id', getOrderById);
router.post('/orders', authPermission(ENUM_USER_ROLE.BUYER), ZodValidation(createOrderZodValidation), createOrder);

export const orderRoutes = router;