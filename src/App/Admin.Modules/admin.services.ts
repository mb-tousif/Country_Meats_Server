import ServerAPIError from "../Error/serverAPIError";
import { TAdmin } from "./admin.interfaces";
import { Admin } from "./admin.model";

export const createAdminService = async (adminInfo: TAdmin) => {
  const result = await Admin.create(adminInfo);
  return result;
};

export const loginAdminService = async ( loginInfo:string ) => {
    const result = await Admin.findOne({phoneNumber: loginInfo});
    return result;
    }
