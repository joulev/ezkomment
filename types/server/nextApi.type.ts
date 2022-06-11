import { NextApiRequest, NextApiResponse } from "next";

/**
 * Similar to Express middleware.
 */
export type ApiMiddleware = (
    req: NextApiRequest,
    res: ApiResponse,
    next: () => Promise<unknown> | unknown
) => unknown | Promise<unknown>;

export type ApiError = {
    error: string;
    errorInfo?: string;
};

export type ApiResponseBody = {
    message: string; // must have
    data?: Record<string, any> | Record<string, any>[];
};

export type ApiResponse = NextApiResponse<ApiResponseBody | ApiError>;
