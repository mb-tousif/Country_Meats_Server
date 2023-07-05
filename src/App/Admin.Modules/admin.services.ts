import { TAdmin } from "./admin.interfaces";
import { Admin } from "./admin.model";

export const createAdminService = async (adminInfo: TAdmin) => {
  const result = await Admin.create(adminInfo);
  const data =  await Admin.findOne({ _id: result._id }).select("-password");
  return data;
};

export const loginAdminService = async (loginInfo: string) => {
  const result = await Admin.findOne({ phoneNumber: loginInfo });
  return result;
};
