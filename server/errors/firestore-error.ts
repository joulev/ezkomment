import CustomApiError from "./custom-api-error";

export function handleFirestoreError(err: unknown): never {
    if (err instanceof Error && !(err instanceof CustomApiError)) {
        const code: number = (err as any).code;
        // Code 5 is thrown when a resource is not found
        if (code === 5) throw new CustomApiError(err, 404);
        // Code 6 is thrown when we try to create a resource with the same id as some existing resource
        if (code === 6) throw new CustomApiError(err, 409);
    }
    throw err;
}
