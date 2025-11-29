"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_interfaces_1 = require("./user.interfaces");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    fullName: { type: String },
    displayName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    password: { type: String },
    profilePicture: { type: String },
    galaryImage: [],
    role: {
        type: String,
        enum: Object.values(user_interfaces_1.ERole),
        default: user_interfaces_1.ERole.USER
    },
    authProvider: [
        {
            provider: {
                type: String,
                enum: Object.values(user_interfaces_1.EAuthProvider),
                required: true
            },
            providerId: {
                type: String,
                required: true
            }
        }
    ],
    bio: { type: String },
    moodBio: [],
    otp: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    otpVerifid: {
        type: Boolean,
        default: false
    },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    nationality: { type: String },
    location: {
        city: { type: String },
        country: { type: String },
    },
    isVerifid: {
        type: Boolean,
        default: false
    },
    // Faith & Spirituality (Optional)
    faithSpirituality: {
        religion: { type: String },
        religionType: { type: String },
        spiritualityScale: { type: String },
        astrologicalDetails: {
            birthDate: {
                type: Date
            },
            birthTime: {
                type: String
            },
            birthPlace: {
                type: String
            }
        }
    },
    // Professional Information
    profetionalInformation: {
        professionSector: { type: String },
        actualProfetion: { type: String },
        educationLebel: { type: String },
        collageUniversityName: { type: String },
    },
    // Lifestyle Information
    lifestypeInformation: {
        height: { type: String },
        maritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'] },
        diet: { type: String },
        isSmoke: { type: Boolean },
        isDrunk: { type: Boolean },
        fitnessLevel: { type: String },
        hasChildren: { type: Boolean },
    },
    // Interest
    interests: [], // String Type array
    // Preferences
    preferences: {
        politicalPreferences: { type: String },
        dealbreakerPreferences: []
    },
    // Verification
    verification: {
        photoIdVerification: {
            verificationType: {
                type: String
            },
            idNumber: {
                type: String
            }
        },
        qualityProfbadge: {
            verificationType: {
                type: String
            },
            certificate: {
                type: String
            }
        },
    },
    blurTokenLimite: {
        type: Number,
        default: 50
    },
    usedBlurToken: {
        type: Number,
        default: 0
    },
    isBlurTokenUnlimited: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt_1.default.hash(this.password, 10);
    next();
});
userSchema.pre("save", async function (next) {
    if (this.isModified("otp") && this.otp) {
        this.otp = await bcrypt_1.default.hash(this.otp, 10);
    }
    next();
});
// Model for User
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user.model.js.map