import { NextFunction, Request, Response } from "express";
import ServerAPIError from "../App/Error/serverAPIError";
import httpStatus from "http-status";
import { verifyToken } from "../Utilities/jwtHandler";
import Config from "../Config";
import { Secret } from "jsonwebtoken";
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | null;
    }
  }
}

const authPermission =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
      if (!token) {
        throw new ServerAPIError(false, httpStatus.UNAUTHORIZED, "Unauthorized access 💥");
        }
        let verifiedUser = null;
        verifiedUser = verifyToken(token, Config.jwt.secret as Secret);
        req.user = verifiedUser;
        
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new ServerAPIError(false, httpStatus.FORBIDDEN, "Forbidden access 💥");
        }
        next();
    } catch (error) {
        next(error);
    }
  };

export default authPermission;
