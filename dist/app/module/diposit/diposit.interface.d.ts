import { Types } from "mongoose";
export declare enum EPaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    REJECT = "REJECT",
    REFUND = "REFUND",
    ACCEPT = "ACCEPT"
}
export interface IDiposit {
    userId: Types.ObjectId;
    dipositPlanName: string;
    amount: number;
    dipositeStatus: EPaymentStatus;
    refandStatus: EPaymentStatus;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=diposit.interface.d.ts.map