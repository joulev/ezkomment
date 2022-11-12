"use client";

import { useEffect } from "react";
import { useLoadingState } from "~/app/loading-state";
import { UserContext } from "./user";
import { ClientUser } from "~/types/server";

type Props = { user: ClientUser };

export default function AppLayoutClient({ user, children }: React.PropsWithChildren<Props>) {
  const { setLoading } = useLoadingState();
  useEffect(() => setLoading(false), [setLoading]);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
