interface IEnv {
    MONGO_URI: string;
    PORT: string;
    DEV_ENVIRONMENT: string;
    SEND_EMAIL: {
        SMTP_HOST: string;
        SMTP_PORT: string;
        SMTP_FORM: string;
        SMTP_USER: string;
        SMTP_PASS: string;
    };
    JWT_ACCESS_SECRATE: string;
    JWT_REFRESH_SECRATE: string;
}
export declare const envVers: IEnv;
export {};
//# sourceMappingURL=env.d.ts.map