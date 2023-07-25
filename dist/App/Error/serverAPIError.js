"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerAPIError extends Error {
    constructor(success, statusCode, message, stack = "") {
        super(message);
        this.success = success;
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ServerAPIError;
//# sourceMappingURL=serverAPIError.js.map