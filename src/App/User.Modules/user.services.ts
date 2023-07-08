import { getUserInfoFromToken } from "../../Utilities/getInfoFromToken";
import { TUser } from "./user.interfaces";
import { User } from "./user.model";

export const getAllUserService = async () => {
    const result = await User.find();
    return result;
};

export const updateUserByIdService = async (id: string, userInfo: Partial<TUser>) => {
    const result = User.findByIdAndUpdate(id, userInfo, { new: true });
    return result;
};

export const deleteUserByIdService = async (id: string) => {
    const result = User.findByIdAndDelete({_id: id}, { new: true });
    return result;
};

export const getAllUserByIdService = async (id: string) => {
    const result = await User.findOne({_id: id});
    return result;
};

export const getUserProfileService = async (token: string) => {
    const userInfo = getUserInfoFromToken(token);
    const { _id } = userInfo;
    const result = await User.findOne({_id});
    return result;
};