export const generateOtp = () => {
    const random = Math.floor(1000000000 + Math.random() * 9000000000).toString(); // 10 digit
    const otp = random.substring(3, 8);
    return otp;
};