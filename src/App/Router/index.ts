import express from 'express';
import { userRoutes } from '../User.Modules/user.routes';
import { cowRoutes } from '../Cow.Modules/cow.routes';
import { orderRoutes } from '../Order.Modules/order.routes';
import { adminsRoutes } from '../Admin.Modules/admin.routes';
import { authRoutes } from '../Auth.Modules/auth.routes';
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