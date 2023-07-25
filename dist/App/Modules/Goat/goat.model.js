"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Goat = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("../../Constants/common");
const mongoose_2 = require("mongoose");
const goatSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        default: "https://img.freepik.com/free-vector/realistic-summer-landscape-with-cute-white-goat-goatling-green-meadow-background-with-mountains-blue-sky-vector-illustration_1284-74081.jpg",
    },
    price: {
        type: Number,
        required: true,
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
exports.Goat = (0, mongoose_2.model)("Goat", goatSchema);
//# sourceMappingURL=goat.model.js.map