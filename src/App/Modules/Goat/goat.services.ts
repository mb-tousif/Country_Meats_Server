import { SortOrder } from "mongoose";
import { TSearched } from "../../Constants/common";
import {
  IPagination,
  IQueryResponse,
  searchFields,
} from "../../Constants/paginationConstants";
import { paginationHandler } from "../../../Utilities/paginationHandler";
import { TGoat } from "./goat.interfaces";
import { Goat } from "./goat.model";

export const createGoatService = async (goatInfo: TGoat) => {
  const result = await Goat.create(goatInfo);
  return result;
};

export const getAllGoatService = async (
  paginationOptions: IPagination,
  searchQuery: TSearched
): Promise<IQueryResponse<TGoat[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHandler(paginationOptions);
  const { searchTerm, ...filterData } = searchQuery;
  const searchItems = searchFields;
  const andConditions: any = [];
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
  const sortedCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortedCondition[sortBy] = sortOrder;
  }

  const noQuery = andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Goat.find(noQuery)
    .sort(sortedCondition)
    .skip(skip)
    .limit(limit)
    .lean();
  const totalPages = Math.ceil((await Goat.countDocuments().lean()) / limit);
  return {
    meta: {
      page,
      limit,
      total: totalPages,
    },
    data: result,
  };
};

export const updateGoatByIdService = async (id: string, goatInfo: TGoat) => {
  const result = await Goat.findByIdAndUpdate({ _id: id }, goatInfo, {
    new: true,
  });
  return result;
};

export const deleteGoatByIdService = async (id: string) => {
  const result = await Goat.findByIdAndDelete({ _id: id }, { new: true });
  return result;
};

export const getGoatByIdService = async (id: string) => {
  const result = await Goat.findOne({ _id: id }).populate("seller");
  return result;
};