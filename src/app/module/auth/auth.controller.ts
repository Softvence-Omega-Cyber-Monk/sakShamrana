import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authServices } from "./auth.services";
import { generateJwtToken } from "../../utils/generateJwtToken";
import { createAccessTokenWithRefreshToken } from "../../utils/createAccessTokenUserRefreshToken";
import AppError from "../../utils/AppError";
import { User } from "../user/user.model";
import { EAuthProvider } from "../user/user.interfaces";

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const data = {
        email,
        password
    };

    const result = await authServices.loginUser(data);
    const token = generateJwtToken(result);
    const allData = {
        token,
        user: result
    }
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Login Successfully",
        data: allData
    });
});


const createAccessTokenUserRefreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.body.token;

    const result = await createAccessTokenWithRefreshToken(refreshToken);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "AccessToken generated success",
        data: result
    })
});

// const googleAndAppleLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const { username, email, provider } = req.body;

//     if (!username || !email) {
//         throw new AppError(400, "Username & Email are required");
//     }

//     let user = await User.findOne({ email });

//     if (!user) {

//         user = await User.create({
//             displayName: username,
//             email,
//             otpVerifid: true,
//             authProvider: [
//                 {
//                     provider: provider,
//                     providerId: email
//                 }
//             ]
//         });


//     } else {

//         const hasAuth = await user.authProvider.some((item) => item.provider === EAuthProvider.GOOGLE || EAuthProvider.APPLE);

//         if (!hasAuth) {
//             user.authProvider.push({
//                 provider: provider,
//                 providerId: email
//             })
//         }

//         await user.save();

//     }

//     const { password, otp, ...rest } = user.toObject();

//     const token = generateJwtToken(user);

//     const data = {
//         token,
//         user: rest
//     }

//     sendResponse(res, {
//         success: true,
//         statusCode: 200,
//         message: "Authentication Success",
//         data: data
//     })

// });

const SocialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, phone, provider, providerId } = req.body;

    if (!provider || !providerId) {
        throw new AppError(400, "Provider & ProviderId required");
    }

    const orConditions: any[] = [];

    if (email) {
        orConditions.push({ email });
    }

    if (phone) {
        orConditions.push({ phone });
    }


    orConditions.push({ "authProvider.providerId": providerId });

    let user = await User.findOne({ $or: orConditions });

    if (!user) {
        user = await User.create({
            displayName: username || "New User",
            email: email || null,
            phone: phone || null,
            otpVerifid: true,
            authProvider: [
                {
                    provider,
                    providerId
                }
            ]
        });
    } else {
        const hasProvider = user.authProvider.some(
            (item: any) => item.provider === provider
        );

        if (!hasProvider) {
            user.authProvider.push({
                provider,
                providerId
            });
        }

        if (!user.email && email) user.email = email;
        if (!user.phoneNumber && phone) user.phoneNumber = phone;

        await user.save();
    }

    const { password, otp, ...rest } = user.toObject();
    const token = generateJwtToken(user);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Authentication successful",
        data: {
            token,
            user: rest
        }
    });
});


export const authController = {
    loginUser,
    createAccessTokenUserRefreshToken,
    SocialLogin
}