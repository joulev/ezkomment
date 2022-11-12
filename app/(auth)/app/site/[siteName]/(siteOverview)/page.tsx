"use client";

import { useSite } from "~/app/(auth)/app/site/[siteName]/site";

export default function AppSiteOverviewPage() {
  const { site } = useSite();
  return <div>{site.name}</div>;
}
