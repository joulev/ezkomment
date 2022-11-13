"use client";

import clsx from "clsx";
import { useSelectedLayoutSegment } from "next/navigation";
import Navbar from "~/app/(auth)/app/components/navbar.client";
import { useSite } from "~/app/(auth)/app/site/[siteName]/site";

export default function AppSiteOverviewLayoutClient({ children }: React.PropsWithChildren) {
  const { site } = useSite();
  const segment = useSelectedLayoutSegment() as null | "customise" | "settings";
  return (
    <>
      <Navbar type="site" activeTab={segment || "all"} siteName={site.name} />
      <main className={clsx("container", segment !== "customise" && "py-9")}>{children}</main>
    </>
  );
}
