import { NextApiRequest } from "next";
import nc from "next-connect";

import { ApiError, ApiResponse } from "~/types/server/nextApi.type";

import CustomApiError from "./errors/customApiError";

/**
 * A helper function to report bad requests in `catch` blocks.
 *
 * @param res The response to be sent back
 * @param err The error occured
 * @param msg Extra message to be sent back with the response
 */
export function reportBadRequest(res: ApiResponse, err: unknown, msg?: string) {
    if (process.env.NODE_ENV === "development") {
        console.log(err);
    }
    if (err instanceof CustomApiError) {
        const { code, message } = err;
        res.status(code).json({ error: message });
    } else {
        throw err;
    }
}

/**
 * A helper function to extract values out of `req.query`.
 *
 * @param req The request
 * @returns A mapping of keys and values
 */
export function extractFirstQueryValue(req: NextApiRequest) {
    const values: Record<string, string> = {};
    for (const [k, v] of Object.entries(req.query)) {
        values[k] = Array.isArray(v) ? v[0] : v;
    }
    return values;
}

export function removeUndefinedProperties(obj: Record<string, any>) {
    for (const [k, v] of Object.entries(obj)) {
        if (v === undefined) delete obj[k];
    }
    return obj;
}

/**
 * Creates a next-connect router with configurations.
 *
 * @return An instance of `next-connect`.
 */
export function ncRouter<
    U extends NextApiRequest = NextApiRequest,
    V extends ApiResponse = ApiResponse
>() {
    return nc<U, V>({
        // handle uncaught errors.
        onError: async (err, _, res) => {
            if (err instanceof CustomApiError) {
                const { code, message } = err;
                return res.status(code).json({ error: message });
            }
            const jsonErr: ApiError = {
                error: String(err),
                stackTrace: err?.stack ?? "",
            };
            if (process.env.NODE_ENV === "development") {
                console.log("Some uncaught error happened?");
                return res.status(500).json(jsonErr);
            }
            const sendErr = await fetch("https://cloud.axiom.co/api/v1/datasets/errors/ingest", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.AXIOM_ERROR_API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify([jsonErr]),
            });
            if (!sendErr.ok) {
                console.log("Cannot send error log");
                console.log(await sendErr.json());
            }
            res.status(500).json({
                error: `Something broke! The error has${sendErr.ok ? " " : " not "}been logged`,
            });
        },
        onNoMatch: (_, res) => {
            res.status(405).json({ error: "Method not allowed" });
        },
    });
}
