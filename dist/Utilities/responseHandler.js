"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseHandler = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: data.data
    };
    res.status(data.statusCode).json(responseData);
};
exports.default = ResponseHandler;
//# sourceMappingURL=responseHandler.js.map