"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationHandler_1 = __importDefault(require("../../../Middleware/zodValidationHandler"));
const cow_controller_1 = require("./cow.controller");
const cow_zod_validation_1 = __importDefault(require("./cow.zod.validation"));
const authPermission_1 = __importDefault(require("../../../Middleware/authPermission"));
const enums_user_1 = require("../../Constants/enums.user");
const router = express_1.default.Router();
router.get('/cows', (0, authPermission_1.default)(enums_user_1.ENUM_USER_ROLE.SELLER, enums_user_1.ENUM_USER_ROLE.ADMIN, enums_user_1.ENUM_USER_ROLE.BUYER), cow_controller_1.getAllCows);
router.post('/cows', (0, authPermission_1.default)(enums_user_1.ENUM_USER_ROLE.SELLER), (0, zodValidationHandler_1.default)(cow_zod_validation_1.default), cow_controller_1.createCow);
router.get('/cows/:id', (0, authPermission_1.default)(enums_user_1.ENUM_USER_ROLE.SELLER, enums_user_1.ENUM_USER_ROLE.ADMIN, enums_user_1.ENUM_USER_ROLE.BUYER), cow_controller_1.getCowById);
router.patch('/cows/:id', (0, authPermission_1.default)(enums_user_1.ENUM_USER_ROLE.SELLER), cow_controller_1.updateCowById);
router.delete('/cows/:id', (0, authPermission_1.default)(enums_user_1.ENUM_USER_ROLE.SELLER), cow_controller_1.deleteCowById);
exports.cowRoutes = router;
//# sourceMappingURL=cow.routes.js.map