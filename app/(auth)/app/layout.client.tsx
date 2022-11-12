"use client";

import { useEffect } from "react";
import { useLoadingState } from "~/app/loading-state";
import { AuthContext, useAuthInit } from "./user";
import { ClientUser } from "~/types/server";

type Props = { rscUser: ClientUser };

export default function AppLayoutClient({ rscUser, children }: React.PropsWithChildren<Props>) {
  const { user, mutate } = useAuthInit(rscUser);
  const { setLoading } = useLoadingState();
  useEffect(() => setLoading(false), [setLoading]);
  return <AuthContext.Provider value={{ user, mutate }}>{children}</AuthContext.Provider>;
}
