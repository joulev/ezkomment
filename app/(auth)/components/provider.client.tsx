"use client";

import AuthContext from "~/client/context/auth";
import { useAuthInit } from "~/client/hooks/auth";

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const providedAuth = useAuthInit();
  return <AuthContext.Provider value={providedAuth}>{children}</AuthContext.Provider>;
}
