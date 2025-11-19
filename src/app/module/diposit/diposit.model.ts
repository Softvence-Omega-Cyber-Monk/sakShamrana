import mongoose from "mongoose";
import { EPaymentStatus, IDiposit } from "./diposit.interface";

const dipositSchema = new mongoose.Schema<IDiposit>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    dipositPlanName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dipositeStatus: {
        type: String,
        enum: Object.values(EPaymentStatus),
        default: EPaymentStatus.PENDING
    },
    refandStatus: {
        type: String,
        enum: Object.values(EPaymentStatus),
        default: EPaymentStatus.PENDING
    }
}, {
    timestamps: true,
    versionKey: false
});

export const Diposit = mongoose.model<IDiposit>("Diposit" , dipositSchema);