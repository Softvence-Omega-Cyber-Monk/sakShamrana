"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuths = void 0;
const AppError_1 = __importDefault(require("../utils/AppError"));
const verifyJwtToken_1 = require("../utils/verifyJwtToken");
const env_1 = require("../config/env");
const user_model_1 = require("../module/user/user.model");
const checkAuths = (...auths) => async (req, res, next) => {
    const token = req.headers?.authorization;
    if (!token) {
        throw new AppError_1.default(400, "User not authorized!");
    }
    ;
    const verifyToken = (0, verifyJwtToken_1.verifyJwtToken)(token, env_1.envVers.JWT_ACCESS_SECRATE);
    console.log(verifyToken);
    const findUser = await user_model_1.User.findById(verifyToken.userId);
    if (!findUser)
        throw new AppError_1.default(404, "User not found");
    if (findUser.role !== verifyToken.role || findUser._id.toString() !== verifyToken.userId) {
        throw new AppError_1.default(403, "You are not permitted to access this route");
    }
    if (auths.length && !auths.includes(findUser?.role)) {
        throw new AppError_1.default(400, "You are not permited access this route");
    }
    ;
    const { password, otp, ...rest } = findUser.toObject();
    req.authUser = rest;
    next();
};
exports.checkAuths = checkAuths;
//# sourceMappingURL=protect.js.map