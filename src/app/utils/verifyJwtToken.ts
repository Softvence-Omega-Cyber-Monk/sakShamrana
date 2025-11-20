import jwt from "jsonwebtoken";

export const verifyJwtToken = (token: string, matchToken: string) => {
    const verifyToken = jwt.verify(token, matchToken);
    return verifyToken;
};