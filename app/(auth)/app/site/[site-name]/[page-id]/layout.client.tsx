"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { PageContext, usePageInit } from "./page-context";
import { useSite } from "../site";
import Navbar from "~/app/(auth)/app/components/navbar.client";
import { ClientPage } from "~/types/server";

type Props = { rscPage: ClientPage };

export default function AppPageLayoutClient({ rscPage, children }: React.PropsWithChildren<Props>) {
  const { site } = useSite();
  const { page, mutate } = usePageInit(rscPage);
  const segment = useSelectedLayoutSegment() as null;
  return (
    <PageContext.Provider value={{ page, mutate }}>
      <Navbar type="page" activeTab={segment || "all"} siteName={site.name} pageId={page.id} />
      <main className="container py-9">{children}</main>
    </PageContext.Provider>
  );
}
