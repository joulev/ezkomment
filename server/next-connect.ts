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
            onError: async (err, _, res) => {
                if (err instanceof CustomApiError) {
                    const { code, message } = err;
                    return res.status(code).json({ error: message });
                }
                const jsonErr = {
                    error: String(err),
                    stackTrace: (err as any)?.stack ?? "",
                };
                if (process.env.NODE_ENV === "development") {
                    console.log("Some uncaught error happened?");
                    /**
                     * I need to log errors to console in developemt to see their formats to
                     * deal with as many errors as possible.
                     */
                    console.dir(err, { depth: null });
                    return res.status(500).json(jsonErr);
                }
                const sendErr = await logError(jsonErr);
                res.status(500).json({
                    error: `The error has${sendErr.ok ? " " : " not "}been logged.`,
                });
                res.status(500).json({ error: "Internal Server Error" });
            },
            onNoMatch: (_, res) => {
                res.status(404).end({ error: "Not Found" });
            },
        });

/**
 * A helper function to log uncaught errors.
 *
 * @param err The error occured
 */
export async function logError(err: unknown) {
    const sendErr = await fetch("https://cloud.axiom.co/api/v1/datasets/errors/ingest", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.AXIOM_ERROR_API_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify([err]),
    });
    if (!sendErr.ok) {
        console.log("Cannot send error log");
        console.log(await sendErr.json());
    }
    return sendErr;
}

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

export function removeUndefinedProperties(obj: Record<string, any>) {
    const props = Object.entries(obj);
    const toBeRemoved = props.filter(([_, v]) => v === undefined).map(([k, _]) => k);
    if (toBeRemoved.length === props.length)
        throw new CustomApiError("Request must not have a empty body");
    toBeRemoved.forEach(k => delete obj[k]);
    return obj;
}
