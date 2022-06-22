import { NextApiRequest, NextApiResponse } from "next";

/**
 * Similar to Express middleware.
 */
export type ApiMiddleware<
    U extends NextApiRequest = NextApiRequest,
    V extends ApiResponse = ApiResponse
> = (req: U, res: V, next: () => Promise<unknown> | unknown) => unknown | Promise<unknown>;

export type ApiError = {
    error: string | ErrorInfo;
    stackTrace?: string;
};

export type ErrorInfo = {
    code: string;
    message: string;
};

export type ApiResponseBody = {
    message: string;
    data?: Record<string, any> | Record<string, any>[];
};

export type ApiResponse = NextApiResponse<ApiResponseBody | ApiError>;

export type FormDataFile = {
    /**
     * Name of the file on the uploader's computer.
     */
    originalname: string;

    /**
     * Value of the `Content-Type` header for this file.
     */
    mimetype: string;

    /**
     * Size of the file in bytes.
     */
    size: number;

    /**
     * A `Buffer` containing the entire file.
     */
    buffer: Buffer;
};

export type ApiRequestWithFormData = NextApiRequest & {
    file?: FormDataFile;
};

export type AuthenticatedApiRequest = Omit<NextApiRequest, "body"> & {
    body: {
        uid: string;
        [key: string]: any;
    };
};
