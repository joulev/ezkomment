"use client";

import Navbar from "~/app/(auth)/app/components/navbar.client";
import { useSite } from "~/app/(auth)/app/site/[siteName]/site";

export default function AppSiteOverviewLayoutClient({ children }: React.PropsWithChildren) {
  const { site } = useSite();
  // const segment = useSelectedLayoutSegment() as "dashboard" | "new" | "account" | null;
  return (
    <>
      <Navbar type="site" activeTab="all" siteName={site.name} />
      <main className="container py-9">{children}</main>
    </>
  );
}
