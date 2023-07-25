"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cow_routes_1 = require("../Modules/Cow/cow.routes");
const order_routes_1 = require("../Modules/Order/order.routes");
const admin_routes_1 = require("../Modules/Admin/admin.routes");
const auth_routes_1 = require("../Modules/Auth/auth.routes");
const user_routes_1 = require("../Modules/User/user.routes");
const goat_routes_1 = require("../Modules/Goat/goat.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/',
        route: user_routes_1.userRoutes
    },
    {
        path: '/',
        route: cow_routes_1.cowRoutes
    },
    {
        path: '/',
        route: goat_routes_1.goatRoutes
    },
    {
        path: '/',
        route: order_routes_1.orderRoutes
    },
    {
        path: '/admins',
        route: admin_routes_1.adminsRoutes
    },
    {
        path: '/auth',
        route: auth_routes_1.authRoutes
    }
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
//# sourceMappingURL=index.js.map