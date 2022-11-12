"use client";
import "client-only";

import { createContext, useContext } from "react";
import { ClientUser } from "~/types/server";

export const UserContext = createContext<ClientUser>({ uid: "", sites: [], providerData: [] });

export const useUser = () => useContext(UserContext);
