import { NextApiRequest, NextApiResponse } from "next";

/**
 * A helper function to report bad requests in `catch` blocks.
 *
 * @param res The response to be sent back
 * @param err The error occured
 * @param msg Extra message to be sent back with the response
 */
export function reportBadRequest(res: NextApiResponse, err: unknown, msg: string) {
    console.error(err);
    res.status(400).json({
        error: `${err}`,
        message: msg,
    });
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
