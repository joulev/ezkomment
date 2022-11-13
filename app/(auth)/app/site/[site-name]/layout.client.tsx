"use client";

import { SiteContext, useSiteInit } from "./site";
import { ClientSite } from "~/types/server";

type Props = { rscSite: ClientSite };

export default function AppSiteLayoutClient({ rscSite, children }: React.PropsWithChildren<Props>) {
  const { site, mutate } = useSiteInit(rscSite);
  return <SiteContext.Provider value={{ site, mutate }}>{children}</SiteContext.Provider>;
}
