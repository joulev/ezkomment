import { NextApiRequest, NextApiResponse } from "next";
import { createRouter as _createRouter } from "next-connect";

type ApiRequest = NextApiRequest;
type ApiResponse<T> = NextApiResponse<T | { error: string }>;

export const createRouter = <T>() => _createRouter<ApiRequest, ApiResponse<T>>();

type Router<T = any> = ReturnType<typeof createRouter<T>>;

export const createHandler = <T>(router: Router<T>) =>
    router
        .all((_, res) => res.status(405).json({ error: "Method Not Allowed" }))
        .handler({
            onError: (err, _, res) => {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            },
            onNoMatch: (_, res) => {
                res.status(404).end({ error: "Not Found" });
            },
        });
