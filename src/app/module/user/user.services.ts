import { sendEmail } from "../../config/sendEmail";
import AppError from "../../utils/AppError";
import { generateOtp } from "../../utils/generateOtp";
import { EAuthProvider, ICreateUserRequest } from "./user.interfaces";
import { User } from "./user.model";
import bcrypt from "bcrypt"

const createUser = async (data: Partial<ICreateUserRequest>) => {

    const existUser = await User.findOne({
        email: data.email
    });

    if (existUser) {
        throw new AppError(400, "User already exist");
    };

    // Generate OTP
    const otp = generateOtp();
    const expiryTime = new Date(Date.now() + 2 * 60 * 1000);

    const result = await User.create({
        email: data.email,
        password: data.password,
        otp: otp,
        otpExpiry: expiryTime,
        authProvider: [
            {
                provider: EAuthProvider.CREADIENTIAL,
                providerId: data.email
            }
        ]
    });

    await sendEmail({
        to: data.email as string,
        subject: "Your OTP Code",
        templateName: "otpEmail",
        templateData: {
            email: data.email,
            otp: otp
        }
    });

    return result;

};


const otpVerify = async (userId: string, otp: string) => {
    const findUser = await User.findById(userId);

    if (!findUser) throw new AppError(404, "User not found");

    if (!findUser.otp || !findUser.otpExpiry) throw new AppError(400, "Otp not generated");

    if (findUser.otpExpiry < new Date) throw new AppError(400, "OTP has expired");

    const isMatchOtp = await bcrypt.compare(otp, findUser.otp as string);

    if (!isMatchOtp) throw new AppError(400, "Invalid Otp");

    findUser.otp = null;
    findUser.otpExpiry = null;
    findUser.otpVerifid = true;

    findUser.save();
    return null;
}

export const userServices = {
    createUser,
    otpVerify
}