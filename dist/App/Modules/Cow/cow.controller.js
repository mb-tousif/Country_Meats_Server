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
exports.getCowById = exports.deleteCowById = exports.getAllCows = exports.updateCowById = exports.createCow = void 0;
const http_status_1 = __importDefault(require("http-status"));
const cow_services_1 = require("./cow.services");
const asyncHandler_1 = __importDefault(require("../../../Utilities/asyncHandler"));
const serverAPIError_1 = __importDefault(require("../../Error/serverAPIError"));
const responseHandler_1 = __importDefault(require("../../../Utilities/responseHandler"));
const paginationConstants_1 = require("../../Constants/paginationConstants");
const paginationQueryHandler_1 = __importDefault(require("../../../Utilities/paginationQueryHandler"));
const jwtHandler_1 = require("../../../Utilities/jwtHandler");
const Config_1 = __importDefault(require("../../../Config"));
exports.createCow = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cowInfo = req.body;
    const token = req.headers.authorization;
    const verifiedToken = (0, jwtHandler_1.verifyToken)(token, Config_1.default.jwt.secret);
    if (!verifiedToken) {
        return next(new serverAPIError_1.default(false, http_status_1.default.UNAUTHORIZED, "Token not found 💥"));
    }
    const { _id } = verifiedToken;
    cowInfo.seller = _id;
    const result = yield (0, cow_services_1.createCowService)(cowInfo);
    if (!result) {
        return next(new serverAPIError_1.default(false, http_status_1.default.BAD_REQUEST, "Cow not created 💥"));
    }
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cow created successfully 🎉",
        data: result,
    });
}));
exports.updateCowById = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const cowInfo = req.body;
    const result = yield (0, cow_services_1.updateCowByIdService)(id, cowInfo);
    if (!result) {
        return next(new serverAPIError_1.default(false, http_status_1.default.NOT_FOUND, "Cow not found 💥"));
    }
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cow updated successfully 🎉",
        data: result,
    });
}));
exports.getAllCows = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = (0, paginationQueryHandler_1.default)(req.query, paginationConstants_1.searchQueryFields);
    const paginationOptions = (0, paginationQueryHandler_1.default)(req.query, paginationConstants_1.paginationFields);
    const result = yield (0, cow_services_1.getAllCowService)(paginationOptions, searchQuery);
    if (!result) {
        return next(new serverAPIError_1.default(false, http_status_1.default.BAD_REQUEST, "Cows data not found 💥"));
    }
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cow found successfully 🎉",
        meta: result.meta,
        data: result.data,
    });
}));
exports.deleteCowById = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, cow_services_1.deleteCowByIdService)(id);
    if (!result) {
        return next(new serverAPIError_1.default(false, http_status_1.default.NOT_FOUND, "Cow not found 💥"));
    }
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cow deleted successfully 🎉",
        data: result,
    });
}));
exports.getCowById = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, cow_services_1.getCowByIdService)(id);
    if (!result) {
        return next(new serverAPIError_1.default(false, http_status_1.default.NOT_FOUND, "Cow not found 💥"));
    }
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cow found successfully 🎉",
        data: result,
    });
}));
//# sourceMappingURL=cow.controller.js.map