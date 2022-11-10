import { NextApiRequest, NextApiResponse } from "next";
import { createRouter as _createRouter } from "next-connect";
import CustomApiError from "~/server/errors/customApiError";

export type ApiError = { error: string };
export type ApiRequest = NextApiRequest & { uid?: string };
export type ApiResponse<T> = NextApiResponse<T | ApiError>;
export type ApiMiddleware<T = any> = (
    req: ApiRequest,
    res: ApiResponse<T>,
    next: () => Promise<unknown> | unknown
) => unknown | Promise<unknown>;

export const createRouter = <T>() => _createRouter<ApiRequest, ApiResponse<T>>();

type Router<T = any> = ReturnType<typeof createRouter<T>>;

export const createHandler = <T>(router: Router<T>) =>
    router
        .all((_, res) => res.status(405).json({ error: "Method Not Allowed" }))
        .handler({
            onError: (err, _, res) => {
                if (err instanceof CustomApiError) {
                    const { code, message } = err;
                    return res.status(code).json({ error: message });
                }
                res.status(500).json({ error: "Internal Server Error" });
            },
            onNoMatch: (_, res) => {
                res.status(404).end({ error: "Not Found" });
            },
        });
