"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { BreakpointContext, useBreakpointInit } from "~/app/breakpoint";

export default function LayoutClient({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  const breakpoint = useBreakpointInit();
  return (
    <BreakpointContext.Provider value={breakpoint}>
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
    </BreakpointContext.Provider>
  );
}
