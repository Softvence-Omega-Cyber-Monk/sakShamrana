interface IEnv {
    MONGO_URI: string;
    PORT: string;
    DEV_ENVIRONMENT: string;
    SERVER_URL: string;
    CLOUDINARY: {
        CLOUDINARY_API_SECRATE: string;
        CLOUDINARY_API_KEY: string;
        CLOUDINARY_CLOUD_NAME: string;
    };
    SEND_EMAIL: {
        SMTP_HOST: string;
        SMTP_PORT: string;
        SMTP_FORM: string;
        SMTP_USER: string;
        SMTP_PASS: string;
    };
    STRIPE: {
        STRIPE_SECRATE_KEY: string;
        STRIPE_PUBLISH_ABLEABLE_KEY: string;
        STRIPE_WEBHOOK: string;
    };
    JWT_ACCESS_SECRATE: string;
    JWT_REFRESH_SECRATE: string;
}
export declare const envVers: IEnv;
export {};
//# sourceMappingURL=env.d.ts.map