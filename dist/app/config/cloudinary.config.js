"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = exports.deleteImageFormCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const AppError_1 = __importDefault(require("../utils/AppError"));
const env_1 = require("./env");
cloudinary_1.v2.config({
    cloud_name: env_1.envVers.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
    api_key: env_1.envVers.CLOUDINARY.CLOUDINARY_API_KEY,
    api_secret: env_1.envVers.CLOUDINARY.CLOUDINARY_API_SECRATE
});
const deleteImageFormCloudinary = async (url) => {
    try {
        const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;
        const match = url.match(regex);
        if (match && match[1]) {
            const public_id = match[1];
            await cloudinary_1.v2.uploader.destroy(public_id);
            console.log(`File ${public_id} deleted form cloudinary.`);
        }
    }
    catch (error) {
        throw new AppError_1.default(400, "Cloudinary image deletion faild.");
    }
};
exports.deleteImageFormCloudinary = deleteImageFormCloudinary;
exports.cloudinaryUpload = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.config.js.map