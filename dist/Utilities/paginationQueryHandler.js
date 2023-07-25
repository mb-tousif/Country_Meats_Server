"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PaginationQueryHandler = (queryObject, keys) => {
    const finalQueryObject = {};
    for (const key of keys) {
        if (queryObject && Object.hasOwnProperty.call(queryObject, key)) {
            finalQueryObject[key] = queryObject[key];
        }
    }
    return finalQueryObject;
};
exports.default = PaginationQueryHandler;
//# sourceMappingURL=paginationQueryHandler.js.map