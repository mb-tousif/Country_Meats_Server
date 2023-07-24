import express from 'express';
import { cowRoutes } from '../Modules/Cow/cow.routes';
import { orderRoutes } from '../Modules/Order/order.routes';
import { adminsRoutes } from '../Modules/Admin/admin.routes';
import { authRoutes } from '../Modules/Auth/auth.routes';
import { userRoutes } from '../Modules/User/user.routes';
const router = express.Router();

const moduleRoutes = [
    {
        path: '/',
        route: userRoutes
    },
    {
        path: '/',
        route: cowRoutes
    },
    {
        path: '/',
        route: orderRoutes
    },
    {
        path: '/admins',
        route: adminsRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    }
];

moduleRoutes.forEach((route) => { 
    router.use(route.path, route.route);
});

export default router;