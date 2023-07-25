"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const authPermission_1 = __importDefault(require("../../../Middleware/authPermission"));
const enums_user_1 = require("../../Constants/enums.user");
const router = express_1.default.Router();
// router.get('/users', getAllUsers);
router.get('/users', (0, authPermission_1.default)(enums_user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.getAllUsers);
router.get('/users/my-profile', user_controller_1.getUserProfile);
router.get('/users/:id', (0, authPermission_1.default)(enums_user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.getUserById);
router.patch('/users/my-profile', user_controller_1.updateUserProfile);
router.patch('/users/:id', (0, authPermission_1.default)(enums_user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.updateUserById);
router.delete('/users/:id', (0, authPermission_1.default)(enums_user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.deleteUserById);
exports.userRoutes = router;
//# sourceMappingURL=user.routes.js.map