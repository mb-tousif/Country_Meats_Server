import httpStatus from "http-status";
import { TAdmin} from "./admin.interfaces";
import { Admin } from "./admin.model";
import { Secret } from "jsonwebtoken";
import { TLoginInfo } from "../../Constants/userConstants";
import ServerAPIError from "../../Error/serverAPIError";
import { generateToken } from "../../../Utilities/jwtHandler";
import Config from "../../../Config";

export const createAdminService = async (adminInfo: TAdmin) => {
  const result = await Admin.create(adminInfo);
  const data =  await Admin.findOne({ _id: result?._id }).select("-password");
  return data;
};

export const loginAdminService = async (loginInfo: TLoginInfo) => {
  const result = await Admin.findOne({ email: loginInfo.email });
  if (!result) {
    new ServerAPIError(false, httpStatus.BAD_REQUEST, "Admin not Found 💥")
  }
  const matchPassword = await Admin.isPasswordMatched(loginInfo.password, result?.password as string);
  
  if (!matchPassword) {
    new ServerAPIError(
      false,
      httpStatus.BAD_REQUEST,
      "Password not matched 💥"
      )
      }
  const { id, role } = result as TAdmin;
  const accessToken = generateToken( { id, role }, Config.jwt.secret as Secret, Config.jwt.expiresIn as string );
  const refreshToken = generateToken( { id, role }, Config.jwt.refreshSecret as Secret, Config.jwt.refreshExpiresIn as string );
  const data = {
    accessToken,
    refreshToken,
  };
  return data;
};
