"use client";
import "client-only";

import { createContext, useContext } from "react";
import useSWR, { KeyedMutator } from "swr";
import { internalSWRGenerator } from "~/app/(auth)/internal-fetch";
import { Notification } from "~/types/server";

export type ContextType = {
    notifications: Notification[];
    mutate: KeyedMutator<Notification[]>;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NotificationContext = createContext<ContextType>({
    notifications: [],
    mutate: async () => [],
    setShow: () => {},
});

export function useNotificationsInit() {
    const { data, mutate } = useSWR(
        "/api/user/notifications",
        internalSWRGenerator<Notification[]>()
    );
    return { notifications: data ?? [], mutate };
}

export const useNotifications = () => useContext(NotificationContext);
