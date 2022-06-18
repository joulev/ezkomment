import CustomApiError from "./customApiError";

export function handleFirestoreError(err: unknown): never {
    if (err instanceof Error && !(err instanceof CustomApiError)) {
        const code: number = (err as any).code;
        if (code === 5) throw new CustomApiError(err, 404);
        // Will change later, as code 6 may happen for different reason.
        if (code === 6) throw new CustomApiError("Name has been taken", 409);
    }
    throw err;
}
