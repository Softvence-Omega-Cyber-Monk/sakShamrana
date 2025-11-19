"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_services_1 = require("./user.services");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const sendResponse_1 = require("../../utils/sendResponse");
const createUser = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new AppError_1.default(400, "Email & password must be required");
    }
    ;
    const data = {
        email,
        password
    };
    const result = await user_services_1.userServices.createUser(data);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "User register successfully",
        data: result
    });
});
const otpVerify = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.body.userId;
    const otp = req.body.otp;
    await user_services_1.userServices.otpVerify(userId, otp);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "OTP verification success",
        data: null
    });
});
exports.userController = {
    createUser,
    otpVerify
};
//# sourceMappingURL=user.controller.js.map