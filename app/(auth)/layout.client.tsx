"use client";

import SetToastContext from "~/app/context/toast";
import { useToastInit } from "~/app/hooks/toast";
import AuthProvider from "./components/provider.client";
import Toast from "./components/toast";

export default function AuthLayoutClient({ children }: React.PropsWithChildren) {
  const { toast, setToast } = useToastInit();
  return (
    <SetToastContext.Provider value={setToast}>
      <AuthProvider>{children}</AuthProvider>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </SetToastContext.Provider>
  );
}
