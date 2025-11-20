"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const user_interfaces_1 = require("../user/user.interfaces");
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = async (data) => {
    const findUser = await user_model_1.User.findOne({ email: data.email });
    if (!findUser?.otpVerifid) {
        throw new AppError_1.default(200, "You are not verifid");
    }
    if (!findUser)
        throw new AppError_1.default(404, "user not found");
    const hasCreadiantial = findUser.authProvider.some((item) => item.provider === user_interfaces_1.EAuthProvider.CREADIENTIAL);
    if (!findUser.password && !hasCreadiantial)
        throw new AppError_1.default(400, "Your ar not a creadiential user");
    const matchPassword = await bcrypt_1.default.compare(data.password, findUser.password);
    if (!matchPassword)
        throw new AppError_1.default(400, "Invalid Password");
    const { password, otp, ...rest } = findUser.toObject();
    return rest;
};
exports.authServices = {
    loginUser
};
//# sourceMappingURL=auth.services.js.map