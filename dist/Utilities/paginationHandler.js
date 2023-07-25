"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHandler = void 0;
const paginationHandler = (options) => {
    const { page = 1, limit = 5 } = options;
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || "price";
    const sortOrder = options.sortOrder || "desc";
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    };
};
exports.paginationHandler = paginationHandler;
//# sourceMappingURL=paginationHandler.js.map