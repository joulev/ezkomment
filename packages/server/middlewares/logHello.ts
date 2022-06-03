import { INextApiMiddleware } from "@server/models/nextApi.type";

export const logHello: INextApiMiddleware = (req, res, next) => {
    console.log("Hello World!");
    return next();
};
