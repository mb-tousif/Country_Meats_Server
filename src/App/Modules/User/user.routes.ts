import express from 'express';
import { deleteUserById, getAllUsers, getUserById, getUserProfile, updateUserById, updateUserProfile } from './user.controller';
import authPermission from '../../../Middleware/authPermission';
import { ENUM_USER_ROLE } from '../../Constants/enums.user';
const router = express.Router();

// router.get('/users', getAllUsers);
router.get('/users', authPermission(ENUM_USER_ROLE.ADMIN), getAllUsers);
router.get('/users/my-profile', getUserProfile);
router.get('/users/:id', authPermission(ENUM_USER_ROLE.ADMIN), getUserById)
router.patch('/users/my-profile', updateUserProfile);
router.patch('/users/:id', authPermission(ENUM_USER_ROLE.ADMIN), updateUserById)
router.delete('/users/:id', authPermission(ENUM_USER_ROLE.ADMIN), deleteUserById);

export const userRoutes = router;