import CustomApiError from "./customApiError";

export function handleUserError(err: unknown): never {
    if (err instanceof Error && !(err instanceof CustomApiError)) {
        const code: string = (err as any).errorInfo?.code ?? "";
        console.log(code);
        if (code === "auth/user-not-found") throw new CustomApiError(err, 404);
        // should not happen as request body is sanitized
        if (code.startsWith("auth/invalid")) throw new CustomApiError(err, 400);
    }
    throw err;
}

export function handleVerifyError(err: unknown): never {
    if (err instanceof Error && !(err instanceof CustomApiError)) {
        const code = (err as any).errorInfo?.code ?? "";
        console.log(code);
        // auth/argument-error is not even mentioned in the documentation
        if (
            code === "auth/user-disabled" ||
            code === "auth/id-token-revoked" ||
            code === "auth/id-token-expired" ||
            code === "auth/session-cookie-expired" ||
            code === "auth/session-cookie-revoked" ||
            code === "auth/argument-error"
        )
            throw new CustomApiError(err, 403);
    }
    throw err;
}
