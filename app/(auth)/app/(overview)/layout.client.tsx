"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import Navbar from "~/app/(auth)/app/components/navbar.client";

export default function AppOverviewLayoutClient({ children }: React.PropsWithChildren) {
  const segment = useSelectedLayoutSegment() as "dashboard" | "new" | "account" | null;
  return (
    <>
      <Navbar type="overview" activeTab={segment || "dashboard"} />
      <main className="container py-9">{children}</main>
    </>
  );
}
