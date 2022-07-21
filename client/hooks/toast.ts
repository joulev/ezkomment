import { useContext, useEffect, useState } from "react";

import SetToastContext from "~/client/context/toast";

import { Toast, ToastInit } from "~/types/client/utils.type";

export function useToastInit(): ToastInit {
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
