"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const zodValidationHandler_1 = __importDefault(require("../../../Middleware/zodValidationHandler"));
const admin_zod_validation_1 = __importDefault(require("./admin.zod.validation"));
const router = express_1.default.Router();
router.post('/create-admin', (0, zodValidationHandler_1.default)(admin_zod_validation_1.default), admin_controller_1.createAdmin);
router.post('/login', admin_controller_1.loginAdmin);
exports.adminsRoutes = router;
//# sourceMappingURL=admin.routes.js.map