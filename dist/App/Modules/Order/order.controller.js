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
exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const http_status_1 = __importDefault(require("http-status"));
const order_services_1 = require("./order.services");
const asyncHandler_1 = __importDefault(require("../../../Utilities/asyncHandler"));
const serverAPIError_1 = __importDefault(require("../../Error/serverAPIError"));
const responseHandler_1 = __importDefault(require("../../../Utilities/responseHandler"));
exports.createOrder = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderInfo = req.body;
    const result = yield (0, order_services_1.createOrderService)(orderInfo);
    if (!result) {
        return next(new serverAPIError_1.default(false, http_status_1.default.BAD_REQUEST, "Order not created 💥"));
    }
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order created successfully 🎉",
        data: result,
    });
}));
exports.getAllOrders = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const result = yield (0, order_services_1.getAllOrdersService)(token);
    if (!result) {
        return next(new serverAPIError_1.default(false, http_status_1.default.BAD_REQUEST, "Orders not found 💥"));
    }
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Orders found successfully 🎉",
        data: result,
    });
}));
exports.getOrderById = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const { id } = req.params;
    const result = yield (0, order_services_1.getOrderByIdService)(token, id);
    if (!result) {
        return next(new serverAPIError_1.default(false, http_status_1.default.BAD_REQUEST, "Orders not found 💥"));
    }
    (0, responseHandler_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Orders found successfully 🎉",
        data: result,
    });
}));
//# sourceMappingURL=order.controller.js.map