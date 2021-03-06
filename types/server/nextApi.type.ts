import { DecodedIdToken } from "firebase-admin/auth";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Similar to Express middleware.
 */
export type ApiMiddleware<
    U extends NextApiRequest = NextApiRequest,
    V extends NextApiResponse = NextApiResponse
> = (req: U, res: V, next: () => Promise<unknown> | unknown) => unknown | Promise<unknown>;

export type ApiError = {
    error: string | ErrorInfo;
    stackTrace?: string;
};

export type ErrorInfo = {
    code: string;
    message: string;
};

export type ApiResponseBody<T = any> = {
    message: string;
    data?: T;
};

export type ApiResponse<T = any> = NextApiResponse<ApiResponseBody<T> | ApiError>;

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

export type ApiRequest = NextApiRequest;

export type ApiRequestWithFormData = ApiRequest & {
    file?: FormDataFile;
};

export type AuthenticatedApiRequest = ApiRequest & {
    // We shall attach the uid into the request
    user: DecodedIdToken;
};

export type AuthenticatedApiRequestWithFormData = AuthenticatedApiRequest & ApiRequestWithFormData;

/**
 * I will probably move this to another file.
 */
export type EmbedConfigurations = {
    /**
     * This is required to know which page will the comment belong to.
     */
    pageId: string;
    getURL: string;
    postURL: string;
};
