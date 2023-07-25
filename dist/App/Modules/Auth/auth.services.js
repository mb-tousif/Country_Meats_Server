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
exports.refreshTokenService = exports.loginAuthService = exports.createAuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../User/user.model");
const serverAPIError_1 = __importDefault(require("../../Error/serverAPIError"));
const jwtHandler_1 = require("../../../Utilities/jwtHandler");
const Config_1 = __importDefault(require("../../../Config"));
const createAuthService = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(userInfo);
    const data = yield user_model_1.User.findOne({ _id: result._id }).select("-password");
    return data;
});
exports.createAuthService = createAuthService;
const loginAuthService = (loginInfo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("JWT Secret:", Config_1.default.jwt.secret);
    console.log("JWT Refresh Secret:", Config_1.default.jwt.refreshSecret);
    const result = yield user_model_1.User.findOne({ email: loginInfo.email });
    if (!result) {
        new serverAPIError_1.default(false, http_status_1.default.BAD_REQUEST, "User not Found 💥");
    }
    const matchPassword = yield user_model_1.User.isPasswordMatched(loginInfo.password, result === null || result === void 0 ? void 0 : result.password);
    if (!matchPassword) {
        new serverAPIError_1.default(false, http_status_1.default.BAD_REQUEST, "Password not matched 💥");
    }
    const { _id, role } = result;
    const accessToken = yield (0, jwtHandler_1.generateToken)({ _id, role }, Config_1.default.jwt.secret, Config_1.default.jwt.expiresIn);
    const refreshToken = yield (0, jwtHandler_1.generateToken)({ _id, role }, Config_1.default.jwt.refreshSecret, Config_1.default.jwt.refreshExpiresIn);
    const data = {
        accessToken,
        refreshToken,
    };
    return data;
});
exports.loginAuthService = loginAuthService;
const refreshTokenService = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = (0, jwtHandler_1.verifyToken)(refreshToken, Config_1.default.jwt.refreshSecret);
    }
    catch (error) {
        throw new serverAPIError_1.default(false, http_status_1.default.UNAUTHORIZED, "Invalid Token");
    }
    const { id, role } = verifiedToken;
    const newAccessToken = (0, jwtHandler_1.generateToken)({ id, role }, Config_1.default.jwt.secret, Config_1.default.jwt.expiresIn);
    return { accessToken: newAccessToken };
});
exports.refreshTokenService = refreshTokenService;
//# sourceMappingURL=auth.services.js.map