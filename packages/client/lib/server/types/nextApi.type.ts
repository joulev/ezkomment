import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

/**
 * Similar to Express middleware.
 */
export type INextApiMiddleware<T = any> = (
    req: NextApiRequest,
    res: NextApiResponse<T>,
    next: () => Promise<unknown> | unknown
) => unknown | Promise<unknown>;
