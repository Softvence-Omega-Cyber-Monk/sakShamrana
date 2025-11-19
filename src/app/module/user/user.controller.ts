import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.services";
import AppError from "../../utils/AppError";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError(400, "Email & password must be required");
    };

    const data = {
        email,
        password
    }

    const result = await userServices.createUser(data);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User register successfully",
        data: result
    })

});

const otpVerify = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;
    const otp = req.body.otp;

    await userServices.otpVerify(userId, otp);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "OTP verification success",
        data: null
    })

})

export const userController = {
    createUser,
    otpVerify
}