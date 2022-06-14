import { ApiMiddleware } from "~/types/server/nextApi.type";

export const logRequest: ApiMiddleware = (req, _, next) => {
    console.log(`req.headers: ${req.headers}`);
    console.log(`req.query: ${req.query}`);
    console.log(`req.body: ${req.body}`);
    next();
};
