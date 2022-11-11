import "client-only";
import { parseCookies } from "nookies";
import { ApiError } from "~/server/next-connect";

type FetchOptions = { url: string; options?: RequestInit | undefined };
type FetchOptionsWithMethod = FetchOptions & { method: "GET" | "POST" | "PUT" | "DELETE" };

function getCsrfToken() {
    const cookies = parseCookies();
    return cookies["csrfToken"];
}

async function internalFetch<T = any>(
    { url, method, options }: FetchOptionsWithMethod,
    isJson = true
) {
    if (process.env.NODE_ENV === "development") console.log({ url, options });
    const response = await fetch(url, {
        ...options,
        method,
        headers: {
            ...(options?.headers ?? {}),
            ...(isJson ? { "Content-Type": "application/json" } : {}),
            "X-CSRF-Token": getCsrfToken(),
        },
    });
    const body = (await response.json()) as T | ApiError;
    if (process.env.NODE_ENV === "development") console.log(body);
    return {
        success: response.ok,
        status: response.status,
        body,
    };
}

export function internalGet<T = any>(url: string, options?: RequestInit) {
    return internalFetch<T>({ url, method: "GET", options });
}

export function internalPost<T = any>(url: string, body: any, options?: RequestInit) {
    const json = JSON.stringify(body);
    return internalFetch<T>({ url, method: "POST", options: { ...options, body: json } });
}

export function internalPostNotJson<T = any>(url: string, body: any, options?: RequestInit) {
    return internalFetch<T>({ url, method: "POST", options: { ...options, body } }, false);
}

export function internalPut<T = any>(url: string, body: any, options?: RequestInit) {
    const json = JSON.stringify(body);
    return internalFetch<T>({ url, method: "PUT", options: { ...options, body: json } });
}

export function internalDelete<T = any>(url: string, options?: RequestInit) {
    return internalFetch<T>({ url, method: "DELETE", options });
}

export function internalSWRGenerator<T = any>() {
    return async (props: FetchOptions | string) => {
        const { url, options }: FetchOptions = typeof props === "string" ? { url: props } : props;
        const { success, body } = await internalGet<T>(url, options);
        if (!success) throw new Error(`Unknown error: ${(body as ApiError).error}`);
        return body as T;
    };
}
