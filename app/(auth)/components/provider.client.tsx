"use client";

import AuthContext from "~/client13/context/auth";
import { useAuthInit } from "~/client13/hooks/auth";

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const providedAuth = useAuthInit();
  return <AuthContext.Provider value={providedAuth}>{children}</AuthContext.Provider>;
}
