import { Types } from "mongoose";
export declare enum PStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    CANCLE = "CANCEL",
    FAILED = "FAILED",
    WITHDROW = "WITHDROW"
}
export interface IPayment {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    planName: string;
    paymentStatus: PStatus;
    email?: string;
    amount: number;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=payment.interfaces.d.ts.map