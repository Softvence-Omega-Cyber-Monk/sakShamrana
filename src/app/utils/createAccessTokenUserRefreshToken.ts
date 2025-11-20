
import { JwtPayload } from "jsonwebtoken";
import { envVers } from "../config/env"
import AppError from "./AppError";
import { verifyJwtToken } from "./verifyJwtToken"
import { User } from "../module/user/user.model";
import { generateJwtToken } from "./generateJwtToken";




// export const createAccessTokenWithRefreshToken = async(refreshToken: string) => {
//     const verify = verifyTokenSecrate(refreshToken, envVar.REFRESH_SECRATE) as JwtPayload;
//     const existUser = await User.findOne({ email: verify.payload.email });

//     if (!existUser) {
//         throw new AppError(StatusCodes.NOT_FOUND, "User dost not exist.")
//     }
//     if (existUser.isActive === IsActive.BLOCKED) {
//         throw new AppError(StatusCodes.BAD_REQUEST, "User is blocked.")
//     }
//     if (existUser.isDeleted) {
//         throw new AppError(StatusCodes.BAD_REQUEST, "User is deleted")
//     }

//     const jwtPayload = { userID: existUser._id, email: existUser.email, role: existUser.role };

//     const accrssToken = generateJwtToken(jwtPayload);

//     return accrssToken

// }

export const createAccessTokenWithRefreshToken = async (refreshToken: string) => {
    const verifyTToken = verifyJwtToken(refreshToken, envVers.JWT_REFRESH_SECRATE) as JwtPayload;

    if (!verifyTToken) throw new AppError(400, "Invalid Refresh Token");

    const findUser = await User.findById(verifyTToken.userId);

    if (!findUser) throw new AppError(404, "User Not found");

    if (!findUser.otpVerifid) throw new AppError(400, "User not verifid");

    const token = generateJwtToken(findUser);

    return { accessToken: token.accessToken };

};

