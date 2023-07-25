import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import { User } from "../User/user.model";
import { TUser } from "../User/user.interfaces";
import { TLoginInfo } from "../../Constants/userConstants";
import ServerAPIError from "../../Error/serverAPIError";
import { generateToken, verifyToken } from "../../../Utilities/jwtHandler";
import Config from "../../../Config";
import { TRefreshTokenResponse } from "./auth.interfaces";

export const createAuthService = async (userInfo: TUser) => {
  const result = await User.create(userInfo);
  const data = await User.findOne({ _id: result._id }).select("-password");
  return data;
};

export const loginAuthService = async (loginInfo: TLoginInfo) => {
  // console.log("JWT Secret:", Config.jwt.secret);
  // console.log("JWT Refresh Secret:", Config.jwt.refreshSecret);
    const result = await User.findOne({ email: loginInfo.email });
    if (!result) {
      new ServerAPIError(false, httpStatus.BAD_REQUEST, "User not Found 💥")
    }
    const matchPassword = await User.isPasswordMatched(loginInfo.password, result?.password as string);
    
    if (!matchPassword) {
      new ServerAPIError(
        false,
        httpStatus.BAD_REQUEST,
        "Password not matched 💥"
        )
        }
    const { _id, role } = result as any;
    const accessToken = await generateToken( { _id, role }, Config.jwt.secret as Secret, Config.jwt.expiresIn as string );
    const refreshToken = await generateToken( { _id, role }, Config.jwt.refreshSecret as Secret, Config.jwt.refreshExpiresIn as string );
    const data = {
      accessToken,
      refreshToken,
    };
    return data;
  };

export const refreshTokenService = async (refreshToken: string): Promise<TRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(refreshToken, Config.jwt.refreshSecret as Secret);
  } catch (error) {
    throw new ServerAPIError(false, httpStatus.UNAUTHORIZED, "Invalid Token");

  }
  const { id, role } = verifiedToken as TUser;
  const newAccessToken = generateToken( { id, role }, Config.jwt.secret as Secret, Config.jwt.expiresIn as string );
  return {accessToken : newAccessToken};
};