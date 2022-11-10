"use client";

import { AuthContext, useAuthInit } from "./auth";

export default function AuthLayoutClient({ children }: React.PropsWithChildren) {
  const auth = useAuthInit();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
