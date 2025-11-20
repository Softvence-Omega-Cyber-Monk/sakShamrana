"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const auth_services_1 = require("./auth.services");
const generateJwtToken_1 = require("../../utils/generateJwtToken");
const createAccessTokenUserRefreshToken_1 = require("../../utils/createAccessTokenUserRefreshToken");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const user_model_1 = require("../user/user.model");
const loginUser = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    const data = {
        email,
        password
    };
    const result = await auth_services_1.authServices.loginUser(data);
    const token = (0, generateJwtToken_1.generateJwtToken)(result);
    const allData = {
        token,
        user: result
    };
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Login Successfully",
        data: allData
    });
});
const createAccessTokenUserRefreshToken = (0, catchAsync_1.default)(async (req, res, next) => {
    const refreshToken = req.body.token;
    const result = await (0, createAccessTokenUserRefreshToken_1.createAccessTokenWithRefreshToken)(refreshToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "AccessToken generated success",
        data: result
    });
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
const SocialLogin = (0, catchAsync_1.default)(async (req, res, next) => {
    const { username, email, phone, provider, providerId } = req.body;
    if (!provider || !providerId) {
        throw new AppError_1.default(400, "Provider & ProviderId required");
    }
    const orConditions = [];
    if (email) {
        orConditions.push({ email });
    }
    if (phone) {
        orConditions.push({ phone });
    }
    orConditions.push({ "authProvider.providerId": providerId });
    let user = await user_model_1.User.findOne({ $or: orConditions });
    if (!user) {
        user = await user_model_1.User.create({
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
    }
    else {
        const hasProvider = user.authProvider.some((item) => item.provider === provider);
        if (!hasProvider) {
            user.authProvider.push({
                provider,
                providerId
            });
        }
        if (!user.email && email)
            user.email = email;
        if (!user.phoneNumber && phone)
            user.phoneNumber = phone;
        await user.save();
    }
    const { password, otp, ...rest } = user.toObject();
    const token = (0, generateJwtToken_1.generateJwtToken)(user);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Authentication successful",
        data: {
            token,
            user: rest
        }
    });
});
exports.authController = {
    loginUser,
    createAccessTokenUserRefreshToken,
    SocialLogin
};
//# sourceMappingURL=auth.controller.js.map