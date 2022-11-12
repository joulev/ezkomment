export * from "./comment.type";
export * from "./page.type";
export * from "./site.type";
export * from "./user.type";

export type RawBody<T> = Partial<{ [P in keyof T]: any }>;
export type OnlyRequired<T, K extends keyof T> = Partial<Omit<T, K>> & Required<Pick<T, K>>;

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
