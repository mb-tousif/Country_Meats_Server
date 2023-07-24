import { SortOrder } from "mongoose";
import { TSearchedCow } from "../../Constants/cowConstants";
import {
  IPagination,
  IQueryResponse,
  cowSearchFields,
} from "../../Constants/paginationConstants";
import { paginationHandler } from "../../../Utilities/paginationHandler";
import { TCow } from "./cow.interfaces";
import { Cow } from "./cow.model";

export const createCowService = async (cowInfo: TCow) => {
  const result = await Cow.create(cowInfo);
  return result;
};

export const getAllCowService = async (
  paginationOptions: IPagination,
  searchQuery: TSearchedCow
): Promise<IQueryResponse<TCow[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHandler(paginationOptions);
  const { searchTerm, ...filterData } = searchQuery;
  const searchFields = cowSearchFields;
  const andConditions: any = [];
  if (searchTerm) {
    andConditions.push({
      $or: searchFields.map((field) => ({
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
  const result = await Cow.find(noQuery)
    .sort(sortedCondition)
    .skip(skip)
    .limit(limit)
    .lean();
  const totalPages = Math.ceil((await Cow.countDocuments().lean()) / limit);
  return {
    meta: {
      page,
      limit,
      total: totalPages,
    },
    data: result,
  };
};

export const updateCowByIdService = async (id: string, cowInfo: TCow) => {
  const result = await Cow.findByIdAndUpdate({ _id: id }, cowInfo, {
    new: true,
  });
  return result;
};

export const deleteCowByIdService = async (id: string) => {
  const result = await Cow.findByIdAndDelete({ _id: id }, { new: true });
  return result;
};

export const getCowByIdService = async (id: string) => {
  const result = await Cow.findOne({ _id: id }).populate("seller");
  return result;
};