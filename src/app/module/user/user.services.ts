import { Types } from "mongoose";
import { sendEmail } from "../../config/sendEmail";
import AppError from "../../utils/AppError";
import { generateOtp } from "../../utils/generateOtp";
import { EAuthProvider, EStatus, ICreateUserRequest, IFaithSpirituality, ILifestyleInformation, IPhotoIdVerification, IPreferences, IQualityProfBadge, IUser } from "./user.interfaces";
import { User } from "./user.model";
import bcrypt from "bcrypt";

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
};


const iFaithSpirituality = async (userId: string, payload: Partial<IFaithSpirituality>) => {
    const { astrologicalDetails, ...rest } = payload;
    const updatedData: Record<string, unknown> = {};

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

    const result = await User.findByIdAndUpdate(
        userId,
        {
            $set: updatedData,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    return result;
};

const iProfessionalInformation = async (userId: string, payload: Partial<{ professionSector: string; actualProfetion: string; educationLebel: string; collageUniversityName: string }>) => {
    const updatedData: Record<string, unknown> = {};

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

    const result = await User.findByIdAndUpdate(
        userId,
        { $set: updatedData },
        { new: true, runValidators: true }
    );

    return result;
};


const lifeStyleInformation = async (userId: Types.ObjectId, payload: Partial<ILifestyleInformation>) => {
    const updateData: Record<string, unknown> = {};

    if (payload && Object.keys(payload).length > 0) {
        Object.entries(payload).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                updateData[`lifestypeInformation.${key}`] = value;
            }
        })
    };

    const result = await User.findByIdAndUpdate(
        userId,
        {
            $set: updateData
        },
        {
            new: true,
            runValidators: true
        }

    );

    return result;

};

const updateIntarest = async (userId: string, payload: string[]) => {
    if (!payload?.length) return null;

    // Clean payload → remove null, undefined, "", "   "
    const cleanedPayload = payload.filter(item =>
        item !== null &&
        item !== undefined &&
        typeof item === "string" &&
        item.trim() !== ""
    );

    if (!cleanedPayload.length) return null;

    const result = await User.findByIdAndUpdate(
        userId,
        {
            $addToSet: {
                interests: { $each: cleanedPayload }
            }
        },
        { new: true }
    );

    return result;
};

const removeInterests = async (userId: string, payload: string[]) => {
    if (!payload?.length) return null;

    const result = await User.findByIdAndUpdate(
        userId,
        {
            $pull: {
                interests: { $in: payload }
            }
        },
        { new: true }
    );

    return result;
};


const updateMoodeBio = async (userId: string, Payload: string[]) => {

    if (!Payload || Payload.length === 0) return null;

    const result = await User.findByIdAndUpdate(userId,
        {
            $addToSet: {
                moodBio: { $each: Payload }
            }
        },
        {
            new: true
        }
    )

    return result;

};


const updateBio = async (userId: string, bio: string) => {
    if (bio === null || bio === undefined || bio === "") throw new AppError(400, "Please give a valuable value");

    const result = await User.findByIdAndUpdate(userId,
        {
            bio: bio
        },
        {
            new: true,
            runValidators: true
        }
    );

    return result;

};


const updatePreferences = async (userId: Types.ObjectId, payload: Partial<IPreferences>) => {
    const updateData: Record<string, unknown> = {};

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
    };

    if (Object.keys(updateData).length === 0) {
        return null;
    }

    const result = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    return result;
};

const updateBasicInfo = async (userId: string, payload: Partial<IUser>) => {

    const allowedFields: (keyof IUser)[] = [
        "fullName",
        "displayName",
        "email",
        "phoneNumber",
        "dateOfBirth",
        "gender",
        "nationality",
        "location",
        "profilePicture"
    ];

    const filteredPayload: { [key in keyof IUser]?: any } = {};

    allowedFields.forEach((field) => {
        let value = payload[field];

        if (value !== null && value !== undefined && value !== "") {

            if (field === "location" && typeof value === "string") {
                try {
                    value = JSON.parse(value);
                } catch (error) {
                    throw new AppError(400, "Invalid location JSON format")
                }
            }


            if (field === "profilePicture") {
                if (value && typeof value === "object" && "path" in value) {
                    value = (value as any).path;
                }
            }

            filteredPayload[field] = value;
        }
    });

    if (Object.keys(filteredPayload).length === 0) {
        throw new AppError(400, "No valid fields to update");
    }

    const result = await User.findByIdAndUpdate(
        userId,
        filteredPayload,
        { new: true }
    );

    if (!result) throw new AppError(400, "User not found");

    return result;
};

const updateGalaryImage = async (userId: string, files: Express.Multer.File[]) => {
    if (!files || files.length === 0) {
        throw new AppError(400, "No images uploaded");
    };


    const imageUrls = files
        .filter((file) => file && typeof file === "object" && "path" in file)
        .map((file: any) => file.path);

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $push: { galaryImage: { $each: imageUrls } }
        },
        { new: true }
    );

    if (!updatedUser) throw new AppError(404, "User not found");

    return updatedUser;
};


const updatePhotoIdVerification = async (userId: Types.ObjectId, payload: Partial<IPhotoIdVerification>) => {
    const updateData: Record<string, unknown> = {};

    if (typeof payload.verificationType === "string" && payload.verificationType.trim() !== "") {
        updateData["verification.photoIdVerification.verificationType"] = payload.verificationType.trim();
    }

    if (typeof payload.idNumber === "string" && payload.idNumber.trim() !== "") {
        updateData["verification.photoIdVerification.idNumber"] = payload.idNumber.trim();
    };

    if (Object.keys(updateData).length === 0) {
        return null;
    }

    const result = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    return result;
};


const updateQualityProfBadge = async (userId: Types.ObjectId, payload: Partial<IQualityProfBadge>) => {
    const updateData: Record<string, unknown> = {};

    let hasValidUpdate = false;

    const isValid = (value: any) => typeof value === "string" && value.trim() !== "" && value !== null && value !== undefined;

    if (isValid(payload.verificationType)) {
        updateData["verification.qualityProfbadge.verificationType"] = payload.verificationType!.trim();
        hasValidUpdate = true;
    };

    if (isValid(payload.certificate)) {
        updateData["verification.qualityProfbadge.certificate"] = payload.certificate!.trim();
        hasValidUpdate = true;
    }

    if (hasValidUpdate) {
        updateData["verification.qualityProfbadge.isQualityProfbadge"] = EStatus.REQUEST;
    }

    if (!hasValidUpdate) {
        return null;
    }

    const result = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    return result;
};


export const userServices = {
    createUser,
    otpVerify,
    iFaithSpirituality,
    iProfessionalInformation,
    lifeStyleInformation,
    updateIntarest,
    removeInterests,
    updateMoodeBio,
    updateBio,
    updatePreferences,
    updateBasicInfo,
    updateGalaryImage,
    updatePhotoIdVerification,
    updateQualityProfBadge
}