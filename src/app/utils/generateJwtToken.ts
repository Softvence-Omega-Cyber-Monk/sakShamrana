import { envVers } from "../config/env";
import { IUser } from "../module/user/user.interfaces";
import jwt from "jsonwebtoken";

export const generateJwtToken = (data: Partial<IUser>) => {
    const payload = {
        userId: data._id,
        email: data.email,
        role: data.role
    };

    const accessToken = jwt.sign(payload, envVers.JWT_ACCESS_SECRATE, { expiresIn: "7d" });
    const refreshToken = jwt.sign(payload, envVers.JWT_REFRESH_SECRATE, { expiresIn: "30d" });

    return { accessToken, refreshToken };

};