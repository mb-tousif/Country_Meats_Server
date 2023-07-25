"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("../../Constants/common");
const mongoose_2 = require("mongoose");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        default: "https://img.freepik.com/free-vector/eid-al-adha-celebration-illustration_23-2148971420.jpg",
    },
    location: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        enum: common_1.ELabel,
        default: common_1.ELabel.forSale,
    },
    category: {
        type: String,
        enum: common_1.ECategory,
        required: true,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cow = (0, mongoose_2.model)("Cow", cowSchema);
//# sourceMappingURL=cow.model.js.map