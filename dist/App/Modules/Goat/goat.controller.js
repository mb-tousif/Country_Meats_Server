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
exports.getGoatById = exports.deleteGoatById = exports.getAllGoats = exports.updateGoatById = exports.createGoat = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncHandler_1 = __importDefault(require("../../../Utilities/asyncHandler"));
const serverAPIError_1 = __importDefault(require("../../Error/serverAPIError"));
const responseHandler_1 = __importDefault(require("../../../Utilities/responseHandler"));
const paginationConstants_1 = require("../../Constants/paginationConstants");
const paginationQueryHandler_1 = __importDefault(require("../../../Utilities/paginationQueryHandler"));
const goat_services_1 = require("./goat.services");
const Config_1 = __importDefault(require("../../../Config"));
const jwtHandler_1 = require("../../../Utilities/jwtHandler");
exports.createGoat = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const goatInfo = req.body;
    const token = req.headers.authorization;
    const verifiedToken = (0, jwtHandler_1.verifyToken)(token, Config_1.default.jwt.secret);
    if (!verifiedToken) {
        return next(new serverAPIError_1.default(false, http_status_1.default.UNAUTHORIZED, "Token not found 💥"));
    }
    const { _id } = verifiedToken;
    goatInfo.seller = _id;
    const result = yield (0, goat_services_1.createGoatService)(goatInfo);
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
exports.updateGoatById = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const cowInfo = req.body;
    const result = yield (0, goat_services_1.updateGoatByIdService)(id, cowInfo);
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
exports.getAllGoats = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = (0, paginationQueryHandler_1.default)(req.query, paginationConstants_1.searchQueryFields);
    const paginationOptions = (0, paginationQueryHandler_1.default)(req.query, paginationConstants_1.paginationFields);
    const result = yield (0, goat_services_1.getAllGoatService)(paginationOptions, searchQuery);
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
exports.deleteGoatById = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, goat_services_1.deleteGoatByIdService)(id);
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
exports.getGoatById = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, goat_services_1.getGoatByIdService)(id);
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
//# sourceMappingURL=goat.controller.js.map