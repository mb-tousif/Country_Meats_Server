import express from 'express';
import ZodValidation from '../../../Middleware/zodValidationHandler';
import authPermission from '../../../Middleware/authPermission';
import { ENUM_USER_ROLE } from '../../Constants/enums.user';
import { createGoat, deleteGoatById, getAllGoats, getGoatById, updateGoatById } from './goat.controller';
import createGoatZodValidation from './goat.zod.validation';
const router = express.Router();

router.get('/goats', authPermission(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER), getAllGoats);
router.post('/goats', authPermission(ENUM_USER_ROLE.SELLER), ZodValidation(createGoatZodValidation), createGoat);
router.get('/goats/:id', authPermission(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER), getGoatById)
router.patch('/goats/:id', authPermission(ENUM_USER_ROLE.SELLER), updateGoatById)
router.delete('/goats/:id', authPermission(ENUM_USER_ROLE.SELLER), deleteGoatById);

export const goatRoutes = router;