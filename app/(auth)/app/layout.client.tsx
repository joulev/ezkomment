"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useLoadingState } from "~/app/loading-state";
import { AuthContext, useAuthInit } from "./user";
import { ClientUser } from "~/types/server";

type Props = { rscUser: ClientUser };

export default function AppLayoutClient({ rscUser, children }: React.PropsWithChildren<Props>) {
  const { user, mutate } = useAuthInit(rscUser);

  const { setLoading } = useLoadingState();
  useEffect(() => setLoading(false), [setLoading]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("loading") === null) return;
    router.push(pathname || "/app/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <AuthContext.Provider value={{ user, mutate }}>{children}</AuthContext.Provider>;
}
