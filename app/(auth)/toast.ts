"use client";
import "client-only";

import { createContext, useContext, useEffect, useState } from "react";

export type Toast = {
    type: "success" | "error";
    message: React.ReactNode;
} | null;
export type ContextType = React.Dispatch<React.SetStateAction<Toast>>;

export const SetToastContext = createContext<ContextType>(() => {});

export function useToastInit() {
    const [toast, setToast] = useState<Toast>(null);
    useEffect(() => {
        if (!toast) return;
        const timeout = setTimeout(() => setToast(null), 5000);
        return () => clearTimeout(timeout);
    }, [toast]);
    return { toast, setToast };
}

export function useSetToast() {
    return useContext(SetToastContext);
}
