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
exports.refreshToken = exports.loginAuth = exports.createUser = void 0;
const auth_services_1 = require("./auth.services");
const asyncHandler_1 = __importDefault(require("../../../Utilities/asyncHandler"));
const serverAPIError_1 = __importDefault(require("../../Error/serverAPIError"));
const http_status_1 = __importDefault(require("http-status"));
const responseHandler_1 = __importDefault(require("../../../Utilities/responseHandler"));
const Config_1 = __importDefault(require("../../../Config"));
exports.createUser = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.body;
    const result = yield (0, auth_services_1.createAuthService)(userInfo);
    if (!result) {
        return next(new serverAPIError_1.default(false, http_status_1.default.BAD_REQUEST, "User not created 💥"));
    }
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User created successfully 🎉",
        data: result,
    });
}));
exports.loginAuth = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInfo = req.body;
    const result = yield (0, auth_services_1.loginAuthService)(loginInfo);
    // set refresh token into cookie
    const { refreshToken } = result, others = __rest(result, ["refreshToken"]);
    const cookieOptions = {
        secure: Config_1.default.env === "production",
        httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "User login successfully 🎉",
        data: others,
    });
}));
exports.refreshToken = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield (0, auth_services_1.refreshTokenService)(refreshToken);
    // const { accessToken, ...others } = result;
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "New access token generated successfully 🎉",
        data: result,
    });
}));
//# sourceMappingURL=auth.controller.js.map