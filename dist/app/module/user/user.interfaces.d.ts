import { Types } from "mongoose";
export interface ICreateUserRequest {
    email: String;
    password: String;
    creadiential: String;
    fullName?: String;
    displayName?: String;
}
export declare enum EAuthProvider {
    CREADIENTIAL = "CREADIENTIAL",
    GOOGLE = "GOOGLE",
    APPLE = "APPLE",
    FACEBOOK = "FACEBOOK"
}
export interface ILocation {
    city?: string;
    country?: string;
}
export interface IAuthProvider {
    provider: EAuthProvider;
    providerId: string;
}
export interface IAstrologicalDetails {
    birthDate?: Date;
    birthTime?: string;
    birthPlace?: string;
}
export interface IFaithSpirituality {
    religion?: string;
    religionType?: string;
    spiritualityScale?: string;
    astrologicalDetails?: IAstrologicalDetails;
}
export interface IProfessionalInformation {
    professionSector?: string;
    actualProfetion?: string;
    educationLebel?: string;
    collageUniversityName?: string;
}
export interface ILifestyleInformation {
    height?: string;
    maritalStatus?: 'Single' | 'Married' | 'Divorced' | 'Widowed';
    diet?: string;
    isSmoke?: boolean;
    isDrunk?: boolean;
    fitnessLevel?: string;
    hasChildren?: boolean;
}
export interface IPreferences {
    politicalPreferences?: string;
    dealbreakerPreferences?: any[];
}
export interface IPhotoIdVerification {
    verificationType?: string;
    idNumber?: string;
}
export interface IQualityProfBadge {
    verificationType?: string;
    certificate?: string;
}
export interface IVerification {
    photoIdVerification?: IPhotoIdVerification;
    qualityProfbadge?: IQualityProfBadge;
}
export declare enum ERole {
    ADMIN = "ADMIN",
    USER = "USER"
}
export interface IUser {
    _id?: Types.ObjectId;
    fullName?: string;
    displayName?: string;
    email?: string;
    phoneNumber?: String;
    password?: string;
    profilePicture?: string[];
    authProvider: IAuthProvider[];
    bio?: string;
    moodBio?: string[];
    otp?: String | null;
    otpExpiry?: Date | null;
    role?: String;
    otpVerifid: Boolean;
    dateOfBirth?: Date;
    galaryImage?: string[];
    gender?: 'Male' | 'Female' | 'Other';
    nationality?: string;
    location?: ILocation;
    isVerifid?: boolean;
    faithSpirituality?: IFaithSpirituality;
    profetionalInformation?: IProfessionalInformation;
    lifestypeInformation?: ILifestyleInformation;
    interests?: string[];
    preferences?: IPreferences;
    verification?: IVerification;
    blurTokenLimite?: number;
    usedBlurToken?: number;
    isBlurTokenUnlimited?: boolean;
    expireDateSubscription?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=user.interfaces.d.ts.map