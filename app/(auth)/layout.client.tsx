"use client";

import { SetToastContext, useToastInit } from "./toast";
import Toast from "./components/toast.client";

export default function AuthLayoutClient({ children }: React.PropsWithChildren) {
  const { toast, setToast } = useToastInit();
  return (
    <SetToastContext.Provider value={setToast}>
      {children}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </SetToastContext.Provider>
  );
}
