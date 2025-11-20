import { NextFunction, Request, Response } from "express";
export declare const authController: {
    loginUser: (req: Request, res: Response, next: NextFunction) => void;
    createAccessTokenUserRefreshToken: (req: Request, res: Response, next: NextFunction) => void;
    SocialLogin: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=auth.controller.d.ts.map