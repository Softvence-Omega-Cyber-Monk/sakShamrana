import { v2 as cloudinary } from "cloudinary";
import AppError from "../utils/AppError";
import { envVers } from "./env";


cloudinary.config({
    cloud_name: envVers.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
    api_key: envVers.CLOUDINARY.CLOUDINARY_API_KEY,
    api_secret: envVers.CLOUDINARY.CLOUDINARY_API_SECRATE
});

export const deleteImageFormCloudinary = async (url: string) => {
    try {
        const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;

        const match = url.match(regex);

        if (match && match[1]) {
            const public_id = match[1];
            await cloudinary.uploader.destroy(public_id);
            console.log(`File ${public_id} deleted form cloudinary.`)
        }
    } catch (error: any) {
        throw new AppError(400, "Cloudinary image deletion faild.")
    }

};

export const cloudinaryUpload = cloudinary;
