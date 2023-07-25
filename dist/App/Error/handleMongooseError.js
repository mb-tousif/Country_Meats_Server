"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const HandleMongooseError = (error) => {
    const errors = Object.values(error.errors).map((el) => {
        return {
            path: el === null || el === void 0 ? void 0 : el.path,
            message: el === null || el === void 0 ? void 0 : el.message,
        };
    });
    return {
        success: false,
        statusCode: http_status_1.default.UNPROCESSABLE_ENTITY,
        message: "Mongoose Validation Error",
        errorMessages: errors,
    };
};
exports.default = HandleMongooseError;
//# sourceMappingURL=handleMongooseError.js.map