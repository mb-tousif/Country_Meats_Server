import { TUser } from "../User.Modules/user.interfaces";
import { User } from "../User.Modules/user.model";

export const createAuthService = async (userInfo: TUser) => {
  const result = await User.create(userInfo);
  const data = await User.findOne({ _id: result._id }).select("-password");
  return data;
};
