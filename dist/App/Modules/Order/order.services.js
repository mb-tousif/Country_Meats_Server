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
exports.getOrderByIdService = exports.getAllOrdersService = exports.createOrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const serverAPIError_1 = __importDefault(require("../../Error/serverAPIError"));
const order_model_1 = require("./order.model");
const http_status_1 = __importDefault(require("http-status"));
const cow_model_1 = require("../Cow/cow.model");
const user_model_1 = require("../User/user.model");
const Config_1 = __importDefault(require("../../../Config"));
const jwtHandler_1 = require("../../../Utilities/jwtHandler");
const createOrderService = (orderInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { buyer, cow, quantity = 1 } = orderInfo;
    //   extra validation
    const cowLabel = yield cow_model_1.Cow.findById(cow).select("label");
    if ((cowLabel === null || cowLabel === void 0 ? void 0 : cowLabel.label) === "sold out") {
        throw new serverAPIError_1.default(false, http_status_1.default.CONFLICT, "Cow is already sold out 💥");
    }
    const cowPrice = yield cow_model_1.Cow.findById(cow).select("price");
    const buyerBalance = yield user_model_1.User.findById(buyer).select("budget");
    if ((buyerBalance === null || buyerBalance === void 0 ? void 0 : buyerBalance.budget) && (cowPrice === null || cowPrice === void 0 ? void 0 : cowPrice.price)) {
        if (buyerBalance.budget >= cowPrice.price * quantity) {
            const total = cowPrice.price * quantity;
            const session = yield mongoose_1.default.startSession();
            try {
                session.startTransaction();
                yield cow_model_1.Cow.findByIdAndUpdate(cow, { label: "sold out" }, { session });
                yield user_model_1.User.findByIdAndUpdate(buyer, { budget: buyerBalance.budget - total }, { session });
                const sellerId = yield cow_model_1.Cow.findById(cow).select("seller");
                yield user_model_1.User.findByIdAndUpdate(sellerId === null || sellerId === void 0 ? void 0 : sellerId.seller, { $inc: { income: +total } }, { session });
                orderInfo.totalPayment = total;
                const order = yield order_model_1.Order.create(orderInfo);
                yield session.commitTransaction();
                yield session.endSession();
                return order;
            }
            catch (error) {
                yield session.abortTransaction();
                yield session.endSession();
                throw error;
            }
        }
        else {
            throw new serverAPIError_1.default(false, http_status_1.default.BAD_REQUEST, "Not enough balance 💥");
        }
    }
});
exports.createOrderService = createOrderService;
const getAllOrdersService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = (0, jwtHandler_1.verifyToken)(token, Config_1.default.jwt.secret);
    const { _id, role } = userInfo;
    const orders = (role !== "admin") ? (yield order_model_1.Order.find({ $or: [{ buyer: _id }, { seller: _id }] }).populate("buyer").populate("cow").populate("seller")) : (yield order_model_1.Order.find().populate("buyer").populate("cow").populate("seller"));
    if (!orders || orders.length === 0) {
        throw new serverAPIError_1.default(false, http_status_1.default.NOT_FOUND, "Orders not found 💥");
    }
    return orders;
});
exports.getAllOrdersService = getAllOrdersService;
const getOrderByIdService = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = (0, jwtHandler_1.verifyToken)(token, Config_1.default.jwt.secret);
    const { _id } = userInfo;
    if (id !== _id) {
        throw new serverAPIError_1.default(false, http_status_1.default.UNAUTHORIZED, "User id not matched 💥");
    }
    const order = yield order_model_1.Order.findOne({ $or: [{ buyer: _id }, { seller: _id }] }).populate("buyer").populate("cow").populate("seller").lean();
    if (!order) {
        throw new serverAPIError_1.default(false, http_status_1.default.NOT_FOUND, "Order not found 💥");
    }
    return order;
});
exports.getOrderByIdService = getOrderByIdService;
//# sourceMappingURL=order.services.js.map