"use client";
import "client-only";

import { createContext, useContext } from "react";
import useSWR, { KeyedMutator } from "swr";
import { internalSWRGenerator } from "~/app/(auth)/internal-fetch";
import { ClientUser } from "~/types/server";

export type ContextType = {
    user: ClientUser;
    mutate: KeyedMutator<ClientUser>;
};

export const AuthContext = createContext<ContextType>({
    user: { uid: "", sites: [], providerData: [] },
    mutate: async () => undefined,
});

export function useAuthInit(fallback: ClientUser) {
    const { data, mutate } = useSWR("/api/user", internalSWRGenerator<ClientUser>(), {
        fallbackData: fallback,
    });
    return { user: data!, mutate };
}

export const useAuth = () => useContext(AuthContext);
