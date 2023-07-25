"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfoFromToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Config_1 = __importDefault(require("../Config"));
const getUserInfoFromToken = (token) => {
    const decodedToken = jsonwebtoken_1.default.verify(token, Config_1.default.jwt.secret);
    return decodedToken;
};
exports.getUserInfoFromToken = getUserInfoFromToken;
//# sourceMappingURL=getInfoFromToken.js.map