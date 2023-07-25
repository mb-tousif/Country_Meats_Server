"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdminService = exports.createAdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const admin_model_1 = require("./admin.model");
const serverAPIError_1 = __importDefault(require("../../Error/serverAPIError"));
const jwtHandler_1 = require("../../../Utilities/jwtHandler");
const Config_1 = __importDefault(require("../../../Config"));
const createAdminService = (adminInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.create(adminInfo);
    const data = yield admin_model_1.Admin.findOne({ _id: result === null || result === void 0 ? void 0 : result._id }).select("-password");
    return data;
});
exports.createAdminService = createAdminService;
const loginAdminService = (loginInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findOne({ email: loginInfo.email });
    if (!result) {
        new serverAPIError_1.default(false, http_status_1.default.BAD_REQUEST, "Admin not Found 💥");
    }
    const matchPassword = yield admin_model_1.Admin.isPasswordMatched(loginInfo.password, result === null || result === void 0 ? void 0 : result.password);
    if (!matchPassword) {
        new serverAPIError_1.default(false, http_status_1.default.BAD_REQUEST, "Password not matched 💥");
    }
    const { id, role } = result;
    const accessToken = (0, jwtHandler_1.generateToken)({ id, role }, Config_1.default.jwt.secret, Config_1.default.jwt.expiresIn);
    const refreshToken = (0, jwtHandler_1.generateToken)({ id, role }, Config_1.default.jwt.refreshSecret, Config_1.default.jwt.refreshExpiresIn);
    const data = {
        accessToken,
        refreshToken,
    };
    return data;
});
exports.loginAdminService = loginAdminService;
//# sourceMappingURL=admin.services.js.map