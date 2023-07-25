"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const http_status_1 = __importDefault(require("http-status"));
const handleZodError_1 = __importDefault(require("../App/Error/handleZodError"));
const handleMongooseError_1 = __importDefault(require("../App/Error/handleMongooseError"));
const GlobalErrorHandler = (error, req, res, next) => {
    Config_1.default.env === "development"
        ? console.log(error)
        : console.log(`🚀 Error Name: ${error.name}`);
    let success, statusCode, message, errorMessages = [];
    if (error.name === "ServerAPIError") {
        success = error.success;
        message = error.message;
        statusCode = error.statusCode;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error.name === "ZodError") {
        const generalizedError = (0, handleZodError_1.default)(error);
        success = generalizedError.success;
        message = generalizedError.message;
        statusCode = generalizedError.statusCode;
        errorMessages = generalizedError.errorMessages;
    }
    else if (error.name === "ValidatorError") {
        const generalizedError = (0, handleMongooseError_1.default)(error);
        success = generalizedError.success;
        message = generalizedError.message;
        statusCode = generalizedError.statusCode;
        errorMessages = generalizedError.errorMessages;
    }
    else if (error instanceof Error) {
        success = false;
        statusCode = http_status_1.default.NOT_FOUND;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(http_status_1.default.BAD_REQUEST).json({
        success: false,
        message: error.message,
        errorMessages,
        stack: Config_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.default = GlobalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map