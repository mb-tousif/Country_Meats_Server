import httpStatus from "http-status";
import { getUserInfoFromToken } from "../../Utilities/getInfoFromToken";
import ServerAPIError from "../Error/serverAPIError";
import { TUser } from "./user.interfaces";
import { User } from "./user.model";

export const getAllUserService = async () => {
  const result = await User.find();
  return result;
};

export const updateUserByIdService = async (
  id: string,
  userInfo: Partial<TUser>
) => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new ServerAPIError(false, httpStatus.NOT_FOUND, "User not found 💥");
  }
  const { name, ...otherData } = userInfo;
  const updatedUserData: Partial<TUser> = { ...otherData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<TUser>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = User.findByIdAndUpdate(id, updatedUserData, {
    new: true,
  }).lean();
  return result;
};

export const deleteUserByIdService = async (id: string) => {
  const result = User.findByIdAndDelete({ _id: id }, { new: true });
  return result;
};

export const getAllUserByIdService = async (id: string) => {
  const result = await User.findOne({ _id: id });
  return result;
};

export const getUserProfileService = async (token: string) => {
  const userInfo = getUserInfoFromToken(token);
  const { _id } = userInfo;
  const result = await User.findOne({ _id });
  return result;
};

export const updateProfileService = async (
  token: string,
  userInfo: Partial<TUser>
) => {
    const { _id } = getUserInfoFromToken(token);
  const user = await User.findOne({ _id});
  if (!user) {
    throw new ServerAPIError(false, httpStatus.NOT_FOUND, "User not found 💥");
  }
  const { name, ...otherData } = userInfo;
  const updatedUserData: Partial<TUser> = { ...otherData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<TUser>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = User.findByIdAndUpdate(_id, updatedUserData, {
    new: true,
  }).lean();
  return result;
};
