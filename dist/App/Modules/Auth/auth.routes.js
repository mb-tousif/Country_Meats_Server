"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_zod_validation_1 = require("./auth.zod.validation");
const zodValidationHandler_1 = __importDefault(require("../../../Middleware/zodValidationHandler"));
const user_zod_validation_1 = __importDefault(require("../User/user.zod.validation"));
const router = express_1.default.Router();
router.post('/signup', (0, zodValidationHandler_1.default)(user_zod_validation_1.default), auth_controller_1.createUser);
router.post('/login', (0, zodValidationHandler_1.default)(auth_zod_validation_1.authLoginZodSchema), auth_controller_1.loginAuth);
router.post('/refresh-token', (0, zodValidationHandler_1.default)(auth_zod_validation_1.refreshTokenZodSchema), auth_controller_1.refreshToken);
exports.authRoutes = router;
//# sourceMappingURL=auth.routes.js.map