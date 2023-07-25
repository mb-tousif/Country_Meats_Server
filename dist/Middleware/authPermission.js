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
const serverAPIError_1 = __importDefault(require("../App/Error/serverAPIError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHandler_1 = require("../Utilities/jwtHandler");
const Config_1 = __importDefault(require("../Config"));
const authPermission = (...requiredRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new serverAPIError_1.default(false, http_status_1.default.UNAUTHORIZED, "Unauthorized access 💥");
        }
        let verifiedUser = null;
        verifiedUser = (0, jwtHandler_1.verifyToken)(token, Config_1.default.jwt.secret);
        req.user = verifiedUser;
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new serverAPIError_1.default(false, http_status_1.default.FORBIDDEN, "Forbidden access 💥");
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = authPermission;
//# sourceMappingURL=authPermission.js.map