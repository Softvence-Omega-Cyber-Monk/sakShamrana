import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../utils/AppError";
import { verifyJwtToken } from "../utils/verifyJwtToken";
import { envVers } from "../config/env";
import { User } from "../module/user/user.model";

export const checkAuths = (...auths: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers?.authorization;

    if (!token) {
        throw new AppError(400, "User not authorized!");
    };

    const verifyToken = verifyJwtToken(token, envVers.JWT_ACCESS_SECRATE) as JwtPayload;

    const findUser = await User.findById(verifyToken.userId);

    if (!findUser) throw new AppError(404, "User not found");

    if (findUser.role !== verifyToken.role || findUser._id.toString() !== verifyToken.userId) {
        throw new AppError(403, "You are not permitted to access this route");
    }

    if (auths.length && !auths.includes(findUser?.role as string)) {
        throw new AppError(400, "You are not permited access this route");
    };

    const { password, otp, ...rest } = findUser.toObject();

    req.authUser = rest;

    next();
}