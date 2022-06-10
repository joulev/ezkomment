import { FC, ReactNode } from "react";

import AuthContext from "~/context/auth";
import { useAuthInit } from "~/hooks/auth";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const providedAuth = useAuthInit();
  return <AuthContext.Provider value={providedAuth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
