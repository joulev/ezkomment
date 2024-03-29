import CustomApiError from "./custom-api-error";

export function handleUserError(err: unknown): never {
    if (err instanceof Error && !(err instanceof CustomApiError)) {
        const code: string = (err as any).errorInfo?.code ?? "";
        if (code === "auth/user-not-found") throw new CustomApiError(err, 404);
        // should not happen as request body is sanitised
        if (code.startsWith("auth/invalid")) throw new CustomApiError(err, 400);
    }
    throw err;
}
