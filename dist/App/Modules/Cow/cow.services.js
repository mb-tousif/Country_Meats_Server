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
exports.getCowByIdService = exports.deleteCowByIdService = exports.updateCowByIdService = exports.getAllCowService = exports.createCowService = void 0;
const paginationConstants_1 = require("../../Constants/paginationConstants");
const paginationHandler_1 = require("../../../Utilities/paginationHandler");
const cow_model_1 = require("./cow.model");
const createCowService = (cowInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.create(cowInfo);
    return result;
});
exports.createCowService = createCowService;
const getAllCowService = (paginationOptions, searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield cow_model_1.Cow.find(noQuery)
        .sort(sortedCondition)
        .skip(skip)
        .limit(limit)
        .lean();
    const totalPages = Math.ceil((yield cow_model_1.Cow.countDocuments().lean()) / limit);
    return {
        meta: {
            page,
            limit,
            total: totalPages,
        },
        data: result,
    };
});
exports.getAllCowService = getAllCowService;
const updateCowByIdService = (id, cowInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findByIdAndUpdate({ _id: id }, cowInfo, {
        new: true,
    });
    return result;
});
exports.updateCowByIdService = updateCowByIdService;
const deleteCowByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findByIdAndDelete({ _id: id }, { new: true });
    return result;
});
exports.deleteCowByIdService = deleteCowByIdService;
const getCowByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findOne({ _id: id }).populate("seller");
    return result;
});
exports.getCowByIdService = getCowByIdService;
//# sourceMappingURL=cow.services.js.map