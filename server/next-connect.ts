import { NextApiRequest, NextApiResponse } from "next";
import { createRouter as _createRouter } from "next-connect";
import CustomApiError from "~/server/errors/custom-api-error";
import { FormDataFile } from "~/types/server";

export type ApiError = { error: string };
export type ApiRequest = NextApiRequest & { uid?: string };
export type ApiRequestWithFormData = ApiRequest & { file?: FormDataFile };
export type ApiResponse<T = {}> = NextApiResponse<T | ApiError>;
export type ApiMiddleware<T = {}> = (
    req: ApiRequest,
    res: ApiResponse<T>,
    next: () => Promise<unknown> | unknown
) => unknown | Promise<unknown>;
export type ApiHandler<T = {}> = (
    req: ApiRequest,
    res: ApiResponse<T>
) => unknown | Promise<unknown>;

export const createRouter = <T = {}>() => _createRouter<ApiRequest, ApiResponse<T>>();

type Router<T = {}> = ReturnType<typeof createRouter<T>>;

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

/**
 * A helper function to extract values out of `req.query`.
 *
 * @param req The request
 * @returns A mapping of keys and values
 */
export function extractFirstQueryValue(req: ApiRequest) {
    const handler = {
        get: (target: ApiRequest["query"], prop: string): string => {
            const value: string | string[] | undefined = target[prop];
            if (value === undefined) throw new Error("Failure! You look up an undefined property?");
            return Array.isArray(value) ? value[0] : value;
        },
    };
    /**
     * Cast to `Record<string, string>` as `get` only return string
     */
    return new Proxy(req.query, handler) as Record<string, string>;
}
