import { FC, ReactNode } from "react";

import { useAuthInit } from "@client/hooks/auth";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  useAuthInit();
  return <>{children}</>;
};

export default AuthProvider;
