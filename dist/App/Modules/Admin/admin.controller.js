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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = exports.createAdmin = void 0;
const admin_services_1 = require("./admin.services");
const http_status_1 = __importDefault(require("http-status"));
const responseHandler_1 = __importDefault(require("../../../Utilities/responseHandler"));
const serverAPIError_1 = __importDefault(require("../../Error/serverAPIError"));
const asyncHandler_1 = __importDefault(require("../../../Utilities/asyncHandler"));
const Config_1 = __importDefault(require("../../../Config"));
exports.createAdmin = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const adminInfo = req.body;
    const result = yield (0, admin_services_1.createAdminService)(adminInfo);
    if (!result) {
        return next(new serverAPIError_1.default(false, http_status_1.default.BAD_REQUEST, "Admin not created 💥"));
    }
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Admin created successfully 🎉",
        data: result,
    });
}));
exports.loginAdmin = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInfo = req.body;
    const result = yield (0, admin_services_1.loginAdminService)(loginInfo);
    const { refreshToken } = result, others = __rest(result, ["refreshToken"]);
    // set refresh token into cookie
    const cookieOptions = {
        secure: Config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Admin login successfully 🎉",
        data: others,
    });
}));
//# sourceMappingURL=admin.controller.js.map