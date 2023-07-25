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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileService = exports.getUserProfileService = exports.getAllUserByIdService = exports.deleteUserByIdService = exports.updateUserByIdService = exports.getAllUserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("./user.model");
const serverAPIError_1 = __importDefault(require("../../Error/serverAPIError"));
const jwtHandler_1 = require("../../../Utilities/jwtHandler");
const Config_1 = __importDefault(require("../../../Config"));
const getAllUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find().select("-password").lean();
    return result;
});
exports.getAllUserService = getAllUserService;
const updateUserByIdService = (id, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ _id: id });
    if (!user) {
        throw new serverAPIError_1.default(false, http_status_1.default.NOT_FOUND, "User not found 💥");
    }
    const { name } = userInfo, otherData = __rest(userInfo, ["name"]);
    const updatedUserData = Object.assign({}, otherData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updatedUserData[nameKey] = name[key];
        });
    }
    const result = user_model_1.User.findByIdAndUpdate(id, updatedUserData, {
        new: true,
    }).lean();
    return result;
});
exports.updateUserByIdService = updateUserByIdService;
const deleteUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.User.findByIdAndDelete({ _id: id }, { new: true });
    return result;
});
exports.deleteUserByIdService = deleteUserByIdService;
const getAllUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ _id: id });
    return result;
});
exports.getAllUserByIdService = getAllUserByIdService;
const getUserProfileService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = (0, jwtHandler_1.verifyToken)(token, Config_1.default.jwt.secret);
    const { _id } = userInfo;
    const result = yield user_model_1.User.findOne({ _id });
    return result;
});
exports.getUserProfileService = getUserProfileService;
const updateProfileService = (token, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = (0, jwtHandler_1.verifyToken)(token, Config_1.default.jwt.secret);
    const user = yield user_model_1.User.findOne({ _id });
    if (!user) {
        throw new serverAPIError_1.default(false, http_status_1.default.NOT_FOUND, "User not found 💥");
    }
    const { name } = userInfo, otherData = __rest(userInfo, ["name"]);
    const updatedUserData = Object.assign({}, otherData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updatedUserData[nameKey] = name[key];
        });
    }
    const result = user_model_1.User.findByIdAndUpdate(_id, updatedUserData, {
        new: true,
    }).lean();
    return result;
});
exports.updateProfileService = updateProfileService;
//# sourceMappingURL=user.services.js.map