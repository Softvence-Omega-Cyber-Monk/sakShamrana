import { Types } from "mongoose";

export interface IPayment {
    _id?: Types.ObjectId,
    userId: Types.ObjectId;   
    planName: string;       
    amount: number;        
    createdAt?: Date;        
    updatedAt?: Date;
}