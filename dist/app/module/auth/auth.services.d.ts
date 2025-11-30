export declare const authServices: {
    loginUser: (data: {
        email: string;
        password: string;
    }) => Promise<{
        _id: import("mongoose").Types.ObjectId;
        fullName?: string;
        displayName?: string;
        email?: string;
        phoneNumber?: String;
        profilePicture?: string[];
        authProvider: import("../user/user.interfaces").IAuthProvider[];
        bio?: string;
        moodBio?: string[];
        otpExpiry?: Date | null;
        role?: String;
        otpVerifid: Boolean;
        dateOfBirth?: Date;
        galaryImage?: string[];
        gender?: "Male" | "Female" | "Other";
        nationality?: string;
        location?: import("../user/user.interfaces").ILocation;
        isVerifid?: boolean;
        faithSpirituality?: import("../user/user.interfaces").IFaithSpirituality;
        profetionalInformation?: import("../user/user.interfaces").IProfessionalInformation;
        lifestypeInformation?: import("../user/user.interfaces").ILifestyleInformation;
        interests?: string[];
        preferences?: import("../user/user.interfaces").IPreferences;
        verification?: import("../user/user.interfaces").IVerification;
        blurTokenLimite?: number;
        usedBlurToken?: number;
        isBlurTokenUnlimited?: boolean;
        expireDateSubscription?: Date;
        totalDipositAmount?: number;
        totalWithdrowAmount?: number;
        totalBalance?: number;
        createdAt?: Date;
        updatedAt?: Date;
        __v: number;
    }>;
};
//# sourceMappingURL=auth.services.d.ts.map