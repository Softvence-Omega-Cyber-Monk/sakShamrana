import dotEnv from "dotenv";

dotEnv.config();

interface IEnv {
    MONGO_URI: string,
    PORT: string,
    DEV_ENVIRONMENT: string,
    SEND_EMAIL: {
        SMTP_HOST: string,
        SMTP_PORT: string,
        SMTP_FORM: string,
        SMTP_USER: string,
        SMTP_PASS: string,
    },
    JWT_ACCESS_SECRATE: string,
    JWT_REFRESH_SECRATE: string
}

const envChecker = (): IEnv => {
    const requiredEnv: string[] = ["MONGO_URI", "PORT", "DEV_ENVIRONMENT", "SMTP_HOST", "SMTP_PORT", "SMTP_FORM", "SMTP_USER", "SMTP_PASS", "JWT_ACCESS_SECRATE", "JWT_REFRESH_SECRATE"];

    requiredEnv.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Required env messing : ${key}`);
        }
    })

    return {
        MONGO_URI: process.env.MONGO_URI as string,
        PORT: process.env.PORT as string,
        DEV_ENVIRONMENT: process.env.DEV_ENVIRONMENT as string,
        JWT_ACCESS_SECRATE: process.env.JWT_ACCESS_SECRATE as string,
        JWT_REFRESH_SECRATE: process.env.JWT_REFRESH_SECRATE as string,
        SEND_EMAIL: {
            SMTP_HOST: process.env.SMTP_HOST as string,
            SMTP_PORT: process.env.SMTP_PORT as string,
            SMTP_FORM: process.env.SMTP_FORM as string,
            SMTP_USER: process.env.SMTP_USER as string,
            SMTP_PASS: process.env.SMTP_PASS as string
        }
    }
};

export const envVers = envChecker();
