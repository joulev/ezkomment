import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { INextApiMiddleware } from "@server/types/nextApi.type";

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
 * Creates a request handling pipeline.
 *
 * @param handler The final handler
 * @param middlewareArr An array of middlewares
 * @returns A function that represents the pipeline to handler request.
 */
function _createNextHandler(
    handler: NextApiHandler,
    middlewareArr: INextApiMiddleware[] = []
): NextApiHandler {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        // Inplace modifications
        const wrappedHandler = async () => await handler(req, res);
        const pipeline: any[] = [...middlewareArr, wrappedHandler];
        for (let i = pipeline.length - 1; i >= 0; i--) {
            const oldMiddleware = pipeline[i];
            pipeline[i] = async () => await oldMiddleware(req, res, pipeline[i + 1]);
        }
        return await pipeline[0]();
    };
}

/**
 * Turn out that there is a library that support Next API like Express API `next-connect`.
 *
 * Create an API endpoint, with handlers and middlewares.
 * To create an API endpoint, imports this function, then call this function with the required
 * arguments to get a `NextApiHandler` object. Then exports it.</br>
 *
 * For example:
 * ```typescript
 * import { createNextHandler } from "@server/utils/nextHandlerUtils";
 * export default createNextHandler(
 *     {
 *         GET: <some handler>,
 *         POST: <some handler>,
 *         DELETE: <some handler>,
 *     }, {
 *         GET: <some middlewares>
 *     }
 * );
 * ```
 *
 * @param handers A mapping of method name and handlers
 * @param middlewares A mapping of method name and middlewares
 * @returns An API endpoint to be exported.
 */
export function createNextHandler(
    handers: Record<string, NextApiHandler>,
    middlewares: Record<string, INextApiMiddleware[]> = {}
): NextApiHandler {
    const pipelines: Record<string, NextApiHandler> = {};
    for (const [k, v] of Object.entries(handers)) {
        pipelines[k] = _createNextHandler(v, middlewares[k]);
    }
    return async (req, res) => {
        let delegateMethod = pipelines[req.method || ""];
        if (!delegateMethod) {
            res.status(400).json({ message: "Bad request: invalid request method" });
        } else {
            await delegateMethod(req, res);
        }
    };
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
