"use client";
import "client-only";

import { createContext } from "react";

export const NotificationShowSetter = createContext<React.Dispatch<React.SetStateAction<boolean>>>(
    () => {}
);
