/**
 * If an error is handled, we will use this class to wrap the error's message and add an response
 * code. We will only handle errors that has been wrapped by this custom class.
 */
export default class CustomApiError extends Error {
    public code: number;

    constructor(message: string, code: number) {
        super(message);
        this.code = code;
    }
}
