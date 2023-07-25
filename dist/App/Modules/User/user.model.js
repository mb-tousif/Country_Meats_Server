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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const serverAPIError_1 = __importDefault(require("../../Error/serverAPIError"));
const Config_1 = __importDefault(require("../../../Config"));
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    img: {
        type: String,
        default: "https://i.imgur.com/HeIi0wU.png",
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        enum: ["seller", "buyer"],
        default: "buyer",
    },
    address: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
    },
    income: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    if (this.role === "buyer" && this.budget <= 0) {
        next(new serverAPIError_1.default(false, http_status_1.default.NOT_FOUND, "Budget must be greater than 0"));
    }
    if (this.role === "buyer" && this.income) {
        next(new serverAPIError_1.default(false, http_status_1.default.NOT_FOUND, "As a buyer you can't have an income"));
    }
    if (this.role === "seller" && this.budget) {
        next(new serverAPIError_1.default(false, http_status_1.default.NOT_FOUND, "As a seller you can't have a budget"));
    }
    next();
});
// Hash Password
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const password = this.password;
    const hashedPassword = bcrypt_1.default.hashSync(password, Number(Config_1.default.jwt.saltRounds));
    this.password = hashedPassword;
    next();
});
// Compare Password
userSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
exports.User = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user.model.js.map