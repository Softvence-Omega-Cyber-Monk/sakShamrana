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

});


const updateFaithSpirituality = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.authUser?._id;
    const faithSpiritualityData = req.body;

    const result = await userServices.iFaithSpirituality(id as string, faithSpiritualityData);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Faith and Spirituality information updated successfully",
        data: result,
    });
});


const updateProfessionalInformation = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.authUser?._id;
    const professionalData = req.body;

    const result = await userServices.iProfessionalInformation(
        userId as string,
        professionalData
    );

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Professional information updated successfully",
        data: result,
    });
}
);


const updateLifeStyleInformation = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.authUser?._id;
    const lifeStyleInformation = req.body;


    const result = await userServices.lifeStyleInformation(userId, lifeStyleInformation);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Lifrstype Information Updated Successfully",
        data: result
    })

});

const updateIntarest = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.authUser?._id;
    const { interests } = req.body;

    const result = await userServices.updateIntarest(userId, interests);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Intareste updated success",
        data: result
    })
});
const removeInterests = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.authUser?._id;
    const { interests } = req.body;

    const result = await userServices.removeInterests(userId, interests);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Intareste removed success",
        data: result
    })
});

const updateBio = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.authUser?._id;
    const bio = req.body.bio;

    const result = await userServices.updateBio(userId, bio);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Bio Updated Success",
        data: result
    })

})

const updateMoodBio = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.authUser?._id;
    const { moodBio } = req.body;

    const result = await userServices.updateIntarest(userId, moodBio);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Mood Bio updated success",
        data: result
    })
});

const updatePreferences = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.authUser?._id;

    const result = await userServices.updatePreferences(userId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Preferences updated success",
        data: result
    })
});

const updateBasicInfo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.authUser?._id;

    const payload = {
        ...req.body
    };

    if (req.file) {
        payload.profilePicture = req.file
    }

    const result = await userServices.updateBasicInfo(userId, payload);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Profile Update Success",
        data: result
    })

});


const updateUserGalaryImage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.authUser?._id;

    const files = req.files as Express.Multer.File[];

    const result = await userServices.updateGalaryImage(userId, files);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Profile galary images updated success",
        data: null
    });
})

export const userController = {
    createUser,
    otpVerify,
    updateFaithSpirituality,
    updateProfessionalInformation,
    updateLifeStyleInformation,
    updateIntarest,
    removeInterests,
    updateBio,
    updateMoodBio,
    updatePreferences,
    updateBasicInfo,
    updateUserGalaryImage
}