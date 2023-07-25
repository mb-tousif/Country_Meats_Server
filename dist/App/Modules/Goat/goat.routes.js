"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationHandler_1 = __importDefault(require("../../../Middleware/zodValidationHandler"));
const authPermission_1 = __importDefault(require("../../../Middleware/authPermission"));
const enums_user_1 = require("../../Constants/enums.user");
const goat_controller_1 = require("./goat.controller");
const goat_zod_validation_1 = __importDefault(require("./goat.zod.validation"));
const router = express_1.default.Router();
router.get('/goats', (0, authPermission_1.default)(enums_user_1.ENUM_USER_ROLE.SELLER, enums_user_1.ENUM_USER_ROLE.ADMIN, enums_user_1.ENUM_USER_ROLE.BUYER), goat_controller_1.getAllGoats);
router.post('/goats', (0, authPermission_1.default)(enums_user_1.ENUM_USER_ROLE.SELLER), (0, zodValidationHandler_1.default)(goat_zod_validation_1.default), goat_controller_1.createGoat);
router.get('/goats/:id', (0, authPermission_1.default)(enums_user_1.ENUM_USER_ROLE.SELLER, enums_user_1.ENUM_USER_ROLE.ADMIN, enums_user_1.ENUM_USER_ROLE.BUYER), goat_controller_1.getGoatById);
router.patch('/goats/:id', (0, authPermission_1.default)(enums_user_1.ENUM_USER_ROLE.SELLER), goat_controller_1.updateGoatById);
router.delete('/goats/:id', (0, authPermission_1.default)(enums_user_1.ENUM_USER_ROLE.SELLER), goat_controller_1.deleteGoatById);
exports.goatRoutes = router;
//# sourceMappingURL=goat.routes.js.map