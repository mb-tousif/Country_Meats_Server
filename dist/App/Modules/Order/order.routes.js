"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationHandler_1 = __importDefault(require("../../../Middleware/zodValidationHandler"));
const order_zod_validation_1 = __importDefault(require("./order.zod.validation"));
const order_controller_1 = require("./order.controller");
const authPermission_1 = __importDefault(require("../../../Middleware/authPermission"));
const enums_user_1 = require("../../Constants/enums.user");
const router = express_1.default.Router();
router.get('/orders', (0, authPermission_1.default)(enums_user_1.ENUM_USER_ROLE.ADMIN, enums_user_1.ENUM_USER_ROLE.BUYER, enums_user_1.ENUM_USER_ROLE.SELLER), order_controller_1.getAllOrders);
router.get('/orders/:id', order_controller_1.getOrderById);
router.post('/orders', (0, authPermission_1.default)(enums_user_1.ENUM_USER_ROLE.BUYER), (0, zodValidationHandler_1.default)(order_zod_validation_1.default), order_controller_1.createOrder);
exports.orderRoutes = router;
//# sourceMappingURL=order.routes.js.map