import express from 'express';
import { deleteUserById, getAllUsers, getUserById, updateUserById } from './user.controller';
const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById)
router.patch('/users/:id', updateUserById)
router.delete('/users/:id', deleteUserById);

export const userRoutes = router;