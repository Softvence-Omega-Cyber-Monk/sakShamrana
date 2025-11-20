"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessTokenWithRefreshToken = void 0;
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("./AppError"));
const verifyJwtToken_1 = require("./verifyJwtToken");
const user_model_1 = require("../module/user/user.model");
const generateJwtToken_1 = require("./generateJwtToken");
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
const createAccessTokenWithRefreshToken = async (refreshToken) => {
    const verifyTToken = (0, verifyJwtToken_1.verifyJwtToken)(refreshToken, env_1.envVers.JWT_REFRESH_SECRATE);
    if (!verifyTToken)
        throw new AppError_1.default(400, "Invalid Refresh Token");
    const findUser = await user_model_1.User.findById(verifyTToken.userId);
    if (!findUser)
        throw new AppError_1.default(404, "User Not found");
    if (!findUser.otpVerifid)
        throw new AppError_1.default(400, "User not verifid");
    const token = (0, generateJwtToken_1.generateJwtToken)(findUser);
    return { accessToken: token.accessToken };
};
exports.createAccessTokenWithRefreshToken = createAccessTokenWithRefreshToken;
//# sourceMappingURL=createAccessTokenUserRefreshToken.js.map