"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { BreakpointContext, useBreakpointInit } from "~/app/breakpoint";
import { LoadingStateContext, useLoadingStateInit } from "~/app/loading-state";

export default function LayoutClient({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  const breakpoint = useBreakpointInit();
  const { loading, setLoading } = useLoadingStateInit();
  return (
    <BreakpointContext.Provider value={breakpoint}>
      <LoadingStateContext.Provider value={{ loading, setLoading }}>
        <div
          id="wrapper"
          className={clsx(
            "relative min-h-[100vh]",
            pathname &&
              !pathname.startsWith("/docs") &&
              !pathname.startsWith("/auth") &&
              "pb-[250px] sm:pb-[165px]"
          )}
        >
          {children}
        </div>
      </LoadingStateContext.Provider>
    </BreakpointContext.Provider>
  );
}
