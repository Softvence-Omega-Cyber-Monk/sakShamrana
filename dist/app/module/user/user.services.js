"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const sendEmail_1 = require("../../config/sendEmail");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const generateOtp_1 = require("../../utils/generateOtp");
const user_interfaces_1 = require("./user.interfaces");
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = async (data) => {
    const existUser = await user_model_1.User.findOne({
        email: data.email
    });
    if (existUser) {
        throw new AppError_1.default(400, "User already exist");
    }
    ;
    // Generate OTP
    const otp = (0, generateOtp_1.generateOtp)();
    const expiryTime = new Date(Date.now() + 2 * 60 * 1000);
    const result = await user_model_1.User.create({
        email: data.email,
        password: data.password,
        otp: otp,
        otpExpiry: expiryTime,
        authProvider: [
            {
                provider: user_interfaces_1.EAuthProvider.CREADIENTIAL,
                providerId: data.email
            }
        ]
    });
    await (0, sendEmail_1.sendEmail)({
        to: data.email,
        subject: "Your OTP Code",
        templateName: "otpEmail",
        templateData: {
            email: data.email,
            otp: otp
        }
    });
    return result;
};
const otpVerify = async (userId, otp) => {
    const findUser = await user_model_1.User.findById(userId);
    if (!findUser)
        throw new AppError_1.default(404, "User not found");
    if (!findUser.otp || !findUser.otpExpiry)
        throw new AppError_1.default(400, "Otp not generated");
    if (findUser.otpExpiry < new Date)
        throw new AppError_1.default(400, "OTP has expired");
    const isMatchOtp = await bcrypt_1.default.compare(otp, findUser.otp);
    if (!isMatchOtp)
        throw new AppError_1.default(400, "Invalid Otp");
    findUser.otp = null;
    findUser.otpExpiry = null;
    findUser.otpVerifid = true;
    findUser.save();
    return null;
};
const iFaithSpirituality = async (userId, payload) => {
    const { astrologicalDetails, ...rest } = payload;
    const updatedData = {};
    if (rest && Object.keys(rest).length > 0) {
        Object.entries(rest).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                updatedData[`faithSpirituality.${key}`] = value;
            }
        });
    }
    if (astrologicalDetails && Object.keys(astrologicalDetails).length > 0) {
        Object.entries(astrologicalDetails).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                updatedData[`faithSpirituality.astrologicalDetails.${key}`] = value;
            }
        });
    }
    const result = await user_model_1.User.findByIdAndUpdate(userId, {
        $set: updatedData,
    }, {
        new: true,
        runValidators: true,
    });
    return result;
};
const iProfessionalInformation = async (userId, payload) => {
    const updatedData = {};
    if (payload && Object.keys(payload).length > 0) {
        Object.entries(payload).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                updatedData[`profetionalInformation.${key}`] = value;
            }
        });
    }
    if (Object.keys(updatedData).length === 0) {
        throw new Error("No valid fields to update");
    }
    const result = await user_model_1.User.findByIdAndUpdate(userId, { $set: updatedData }, { new: true, runValidators: true });
    return result;
};
const lifeStyleInformation = async (userId, payload) => {
    const updateData = {};
    if (payload && Object.keys(payload).length > 0) {
        Object.entries(payload).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                updateData[`lifestypeInformation.${key}`] = value;
            }
        });
    }
    ;
    const result = await user_model_1.User.findByIdAndUpdate(userId, {
        $set: updateData
    }, {
        new: true,
        runValidators: true
    });
    return result;
};
const updateIntarest = async (userId, payload) => {
    if (!payload?.length)
        return null;
    // Clean payload → remove null, undefined, "", "   "
    const cleanedPayload = payload.filter(item => item !== null &&
        item !== undefined &&
        typeof item === "string" &&
        item.trim() !== "");
    if (!cleanedPayload.length)
        return null;
    const result = await user_model_1.User.findByIdAndUpdate(userId, {
        $addToSet: {
            interests: { $each: cleanedPayload }
        }
    }, { new: true });
    return result;
};
const removeInterests = async (userId, payload) => {
    if (!payload?.length)
        return null;
    const result = await user_model_1.User.findByIdAndUpdate(userId, {
        $pull: {
            interests: { $in: payload }
        }
    }, { new: true });
    return result;
};
const updateMoodeBio = async (userId, Payload) => {
    if (!Payload || Payload.length === 0)
        return null;
    const result = await user_model_1.User.findByIdAndUpdate(userId, {
        $addToSet: {
            moodBio: { $each: Payload }
        }
    }, {
        new: true
    });
    return result;
};
const updateBio = async (userId, bio) => {
    if (bio === null || bio === undefined || bio === "")
        throw new AppError_1.default(400, "Please give a valuable value");
    const result = await user_model_1.User.findByIdAndUpdate(userId, {
        bio: bio
    }, {
        new: true,
        runValidators: true
    });
    return result;
};
const updatePreferences = async (userId, payload) => {
    const updateData = {};
    if (payload && Object.keys(payload).length > 0) {
        if (typeof payload.politicalPreferences === "string" && payload.politicalPreferences.trim() !== "") {
            updateData["preferences.politicalPreferences"] = payload.politicalPreferences.trim();
        }
        if (Array.isArray(payload.dealbreakerPreferences)) {
            const cleanedArray = payload.dealbreakerPreferences.filter((item) => typeof item === "string" && item.trim() !== "");
            if (cleanedArray.length > 0) {
                updateData["preferences.dealbreakerPreferences"] = cleanedArray;
            }
        }
    }
    ;
    if (Object.keys(updateData).length === 0) {
        return null;
    }
    const result = await user_model_1.User.findByIdAndUpdate(userId, { $set: updateData }, { new: true, runValidators: true });
    return result;
};
exports.userServices = {
    createUser,
    otpVerify,
    iFaithSpirituality,
    iProfessionalInformation,
    lifeStyleInformation,
    updateIntarest,
    removeInterests,
    updateMoodeBio,
    updateBio,
    updatePreferences
};
//# sourceMappingURL=user.services.js.map