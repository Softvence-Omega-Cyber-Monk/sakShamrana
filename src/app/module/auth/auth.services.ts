
import AppError from "../../utils/AppError";
import { EAuthProvider } from "../user/user.interfaces";
import { User } from "../user/user.model";
import bcrypt from "bcrypt";


const loginUser = async (data: { email: string, password: string }) => {
    const findUser = await User.findOne({ email: data.email });

    if (!findUser?.otpVerifid) {
        throw new AppError(200, "You are not verifid");
    }

    if (!findUser) throw new AppError(404, "user not found");

    const hasCreadiantial = findUser.authProvider.some((item) => item.provider === EAuthProvider.CREADIENTIAL);

    if (!findUser.password && !hasCreadiantial) throw new AppError(400, "Your ar not a creadiential user");

    const matchPassword = await bcrypt.compare(data.password, findUser.password as string);

    if (!matchPassword) throw new AppError(400, "Invalid Password");

    const { password, otp, ...rest } = findUser.toObject();

    return rest;

};


export const authServices = {
    loginUser
}