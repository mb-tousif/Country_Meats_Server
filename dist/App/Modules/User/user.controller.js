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
exports.updateUserProfile = exports.getUserProfile = exports.getUserById = exports.getAllUsers = exports.deleteUserById = exports.updateUserById = void 0;
const user_services_1 = require("./user.services");
const http_status_1 = __importDefault(require("http-status"));
const asyncHandler_1 = __importDefault(require("../../../Utilities/asyncHandler"));
const serverAPIError_1 = __importDefault(require("../../Error/serverAPIError"));
const responseHandler_1 = __importDefault(require("../../../Utilities/responseHandler"));
exports.updateUserById = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const userInfo = req.body;
    const result = yield (0, user_services_1.updateUserByIdService)(id, userInfo);
    if (!result) {
        return next(new serverAPIError_1.default(false, http_status_1.default.NOT_FOUND, "User not found 💥"));
    }
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User updated successfully 🎉",
        data: result,
    });
}));
exports.deleteUserById = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, user_services_1.deleteUserByIdService)(id);
    if (!result) {
        return next(new serverAPIError_1.default(false, http_status_1.default.NOT_FOUND, "User not found 💥"));
    }
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User deleted successfully 🎉",
        data: result,
    });
}));
exports.getAllUsers = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_services_1.getAllUserService)();
    if (!result) {
        return next(new serverAPIError_1.default(false, http_status_1.default.NOT_FOUND, "Users not Found 💥"));
    }
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Users fetched successfully 🎉",
        data: result,
    });
}));
exports.getUserById = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, user_services_1.getAllUserByIdService)(id);
    if (!result) {
        return next(new serverAPIError_1.default(false, http_status_1.default.NOT_FOUND, "User not Found 💥"));
    }
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User fetched successfully 🎉",
        data: result,
    });
}));
exports.getUserProfile = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const result = yield (0, user_services_1.getUserProfileService)(token);
    if (!result) {
        return next(new serverAPIError_1.default(false, http_status_1.default.NOT_FOUND, "User not Found 💥"));
    }
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User fetched successfully 🎉",
        data: result,
    });
}));
exports.updateUserProfile = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const userInfo = req.body;
    const result = yield (0, user_services_1.updateProfileService)(token, userInfo);
    if (!result) {
        return next(new serverAPIError_1.default(false, http_status_1.default.NOT_FOUND, "User not Found 💥"));
    }
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User fetched successfully 🎉",
        data: result,
    });
}));
//# sourceMappingURL=user.controller.js.map