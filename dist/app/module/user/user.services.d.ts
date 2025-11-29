import { Types } from "mongoose";
import { ICreateUserRequest, IFaithSpirituality, ILifestyleInformation, IPreferences, IUser } from "./user.interfaces";
export declare const userServices: {
    createUser: (data: Partial<ICreateUserRequest>) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    otpVerify: (userId: string, otp: string) => Promise<null>;
    iFaithSpirituality: (userId: string, payload: Partial<IFaithSpirituality>) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    iProfessionalInformation: (userId: string, payload: Partial<{
        professionSector: string;
        actualProfetion: string;
        educationLebel: string;
        collageUniversityName: string;
    }>) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    lifeStyleInformation: (userId: Types.ObjectId, payload: Partial<ILifestyleInformation>) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    updateIntarest: (userId: string, payload: string[]) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    removeInterests: (userId: string, payload: string[]) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    updateMoodeBio: (userId: string, Payload: string[]) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    updateBio: (userId: string, bio: string) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    updatePreferences: (userId: Types.ObjectId, payload: Partial<IPreferences>) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    updateBasicInfo: (userId: string, payload: Partial<IUser>) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
};
//# sourceMappingURL=user.services.d.ts.map