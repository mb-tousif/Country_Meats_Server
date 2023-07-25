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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const cow_model_1 = require("../Cow/cow.model");
const goat_model_1 = require("../Goat/goat.model");
const orderSchema = new mongoose_1.Schema({
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cow: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Cow",
    },
    goat: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Goat",
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    quantity: {
        type: Number,
    },
    totalPayment: {
        type: Number,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
orderSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.buyer && this.cow) {
            const sellerId = yield cow_model_1.Cow.findById(this.cow).select("seller");
            this.seller = sellerId === null || sellerId === void 0 ? void 0 : sellerId.seller;
        }
        else if (this.buyer && this.goat) {
            const sellerId = yield goat_model_1.Goat.findById(this.goat).select("seller");
            this.seller = sellerId === null || sellerId === void 0 ? void 0 : sellerId.seller;
        }
        next();
    });
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
//# sourceMappingURL=order.model.js.map