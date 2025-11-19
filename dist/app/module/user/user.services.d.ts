import { ICreateUserRequest } from "./user.interfaces";
export declare const userServices: {
    createUser: (data: Partial<ICreateUserRequest>) => Promise<import("mongoose").Document<unknown, {}, import("./user.interfaces").IUser, {}, {}> & import("./user.interfaces").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    otpVerify: (userId: string, otp: string) => Promise<null>;
};
//# sourceMappingURL=user.services.d.ts.map