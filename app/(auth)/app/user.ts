"use client";
import "client-only";

import { createContext, useContext } from "react";
import { ClientUser, Notification } from "~/types/server";

export type ContextType = ClientUser & { notifications: Notification[] };

export const UserContext = createContext<ContextType>({
    uid: "",
    sites: [],
    notifications: [],
    providerData: [],
});

export const useUser = () => useContext(UserContext);
