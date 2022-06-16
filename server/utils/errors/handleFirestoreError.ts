import CustomApiError from "./customApiError";

export function handleFirestoreError(err: unknown): never {
    if (err instanceof Error && !(err instanceof CustomApiError)) {
        const code: number = (err as any).code;
        if (code === 5) throw new CustomApiError(err, 404);
    }
    throw err;
}
