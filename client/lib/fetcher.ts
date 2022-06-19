import { getAuth } from "firebase/auth";

import { FetchOptions } from "~/types/client/utils.type";
import { ApiError, ApiResponseBody } from "~/types/server/nextApi.type";

import { NOT_AUTHENTICATED } from "./errors";

/**
 * Fetch data from the backend in an authenticated context.
 */
export async function internalFetcher({ url, method, options }: FetchOptions, isJson = true) {
    const user = getAuth().currentUser;
    if (!user) throw NOT_AUTHENTICATED;
    const token = await user.getIdToken();
    const response = await fetch(url, {
        ...options,
        method,
        headers: {
            ...(options?.headers ?? {}),
            ...(isJson ? { "Content-Type": "application/json" } : {}),
            Authorization: `Bearer ${token}`,
        },
    });
    return {
        success: response.ok,
        status: response.status,
        body: (await response.json()) as ApiResponseBody | ApiError,
    };
}

/**
 * A generator for `useSWR` fetchers.
 *
 * Generally using the async function directly is enough, but I cannot get SWR to get the type
 * correctly. The async has to have a generic type, but SWR doesn't allow passing that type argument
 * to `fetcher` param (obviously), so while I wanted to do something like this, it's not possible:
 *
 * ```ts
 * async function fetcher<T>({ url, options }: Omit<FetchOptions, "method">) {
 *   const { body } = internalFetcher({ url, method: "GET", options });
 *   return body.data as T
 * }
 * // ...
 * const { data } = useSWR({ url }, fetcher<Site>);
 * ```
 *
 * So I had to make this generator purely for typings, so that I can use, say,
 *
 * ```ts
 * const { data } = useSWR({ url }, internalSWRGenerator<Site>());
 * ```
 *
 * @returns A fetcher for `useSWR`
 */
export function internalSWRGenerator<T = any>() {
    return async ({ url, options }: Omit<FetchOptions, "method">) => {
        const { success, body } = await internalFetcher({ url, method: "GET", options });
        if (!success) throw new Error(`Unknown error: ${(body as ApiError).error}`);
        return (body as ApiResponseBody).data as T;
    };
}
