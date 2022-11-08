"use client";

import AuthContext from "~/app/context/auth";
import { useAuthInit } from "~/app/hooks/auth";

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const providedAuth = useAuthInit();
  return <AuthContext.Provider value={providedAuth}>{children}</AuthContext.Provider>;
}
