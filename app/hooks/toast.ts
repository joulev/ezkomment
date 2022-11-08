import "client-only";
import { useContext, useEffect, useState } from "react";
import SetToastContext, { Toast, SetToastContextType } from "~/app/context/toast";

export function useToastInit(): { toast: Toast; setToast: SetToastContextType } {
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
