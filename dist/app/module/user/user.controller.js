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
const updateFaithSpirituality = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.authUser?._id;
    const faithSpiritualityData = req.body;
    const result = await user_services_1.userServices.iFaithSpirituality(id, faithSpiritualityData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Faith and Spirituality information updated successfully",
        data: result,
    });
});
const updateProfessionalInformation = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.authUser?._id;
    const professionalData = req.body;
    const result = await user_services_1.userServices.iProfessionalInformation(userId, professionalData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Professional information updated successfully",
        data: result,
    });
});
const updateLifeStyleInformation = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.authUser?._id;
    const lifeStyleInformation = req.body;
    const result = await user_services_1.userServices.lifeStyleInformation(userId, lifeStyleInformation);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Lifrstype Information Updated Successfully",
        data: result
    });
});
const updateIntarest = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.authUser?._id;
    const { interests } = req.body;
    const result = await user_services_1.userServices.updateIntarest(userId, interests);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Intareste updated success",
        data: result
    });
});
const removeInterests = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.authUser?._id;
    const { interests } = req.body;
    const result = await user_services_1.userServices.removeInterests(userId, interests);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Intareste removed success",
        data: result
    });
});
const updateBio = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.authUser?._id;
    const bio = req.body.bio;
    const result = await user_services_1.userServices.updateBio(userId, bio);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Bio Updated Success",
        data: result
    });
});
const updateMoodBio = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.authUser?._id;
    const { moodBio } = req.body;
    const result = await user_services_1.userServices.updateIntarest(userId, moodBio);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Mood Bio updated success",
        data: result
    });
});
const updatePreferences = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.authUser?._id;
    const result = await user_services_1.userServices.updatePreferences(userId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Preferences updated success",
        data: result
    });
});
const updateBasicInfo = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.authUser?._id;
    const payload = {
        ...req.body
    };
    if (req.file) {
        payload.profilePicture = req.file;
    }
    const result = await user_services_1.userServices.updateBasicInfo(userId, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Profile Update Success",
        data: result
    });
});
const updateUserGalaryImage = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.authUser?._id;
    const files = req.files;
    const result = await user_services_1.userServices.updateGalaryImage(userId, files);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Profile galary images updated success",
        data: null
    });
});
const updatePhotoIdVerification = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.authUser?._id;
    const result = await user_services_1.userServices.updatePhotoIdVerification(userId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Photo Id verification successfully",
        data: result
    });
});
const updateQualityProofBadges = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.authUser?._id;
    const payload = {
        ...req.body,
        certificate: req.file?.path
    };
    const result = await user_services_1.userServices.updateQualityProfBadge(userId, payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Your Quality Proof request has been sent to our official community members.",
        data: result
    });
});
exports.userController = {
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
    updateUserGalaryImage,
    updatePhotoIdVerification,
    updateQualityProofBadges
};
//# sourceMappingURL=user.controller.js.map