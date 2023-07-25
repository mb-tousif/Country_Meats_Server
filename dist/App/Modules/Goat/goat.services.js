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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoatByIdService = exports.deleteGoatByIdService = exports.updateGoatByIdService = exports.getAllGoatService = exports.createGoatService = void 0;
const paginationConstants_1 = require("../../Constants/paginationConstants");
const paginationHandler_1 = require("../../../Utilities/paginationHandler");
const goat_model_1 = require("./goat.model");
const createGoatService = (goatInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield goat_model_1.Goat.create(goatInfo);
    return result;
});
exports.createGoatService = createGoatService;
const getAllGoatService = (paginationOptions, searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHandler_1.paginationHandler)(paginationOptions);
    const { searchTerm } = searchQuery, filterData = __rest(searchQuery, ["searchTerm"]);
    const searchItems = paginationConstants_1.searchFields;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: searchItems.map((field) => ({
                [field]: { $regex: searchTerm, $options: "i" },
            })),
        });
    }
    if (Object.keys(filterData).length) {
        andConditions.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortedCondition = {};
    if (sortBy && sortOrder) {
        sortedCondition[sortBy] = sortOrder;
    }
    const noQuery = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield goat_model_1.Goat.find(noQuery)
        .sort(sortedCondition)
        .skip(skip)
        .limit(limit)
        .lean();
    const totalPages = Math.ceil((yield goat_model_1.Goat.countDocuments().lean()) / limit);
    return {
        meta: {
            page,
            limit,
            total: totalPages,
        },
        data: result,
    };
});
exports.getAllGoatService = getAllGoatService;
const updateGoatByIdService = (id, goatInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield goat_model_1.Goat.findByIdAndUpdate({ _id: id }, goatInfo, {
        new: true,
    });
    return result;
});
exports.updateGoatByIdService = updateGoatByIdService;
const deleteGoatByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield goat_model_1.Goat.findByIdAndDelete({ _id: id }, { new: true });
    return result;
});
exports.deleteGoatByIdService = deleteGoatByIdService;
const getGoatByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield goat_model_1.Goat.findOne({ _id: id }).populate("seller");
    return result;
});
exports.getGoatByIdService = getGoatByIdService;
//# sourceMappingURL=goat.services.js.map