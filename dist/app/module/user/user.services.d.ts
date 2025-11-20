import { ICreateUserRequest, IFaithSpirituality } from "./user.interfaces";
export declare const userServices: {
    createUser: (data: Partial<ICreateUserRequest>) => Promise<import("mongoose").Document<unknown, {}, import("./user.interfaces").IUser, {}, {}> & import("./user.interfaces").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    otpVerify: (userId: string, otp: string) => Promise<null>;
    iFaithSpirituality: (userId: string, payload: Partial<IFaithSpirituality>) => Promise<(import("mongoose").Document<unknown, {}, import("./user.interfaces").IUser, {}, {}> & import("./user.interfaces").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    iProfessionalInformation: (userId: string, payload: Partial<{
        professionSector: string;
        actualProfetion: string;
        educationLebel: string;
        collageUniversityName: string;
    }>) => Promise<(import("mongoose").Document<unknown, {}, import("./user.interfaces").IUser, {}, {}> & import("./user.interfaces").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=user.services.d.ts.map