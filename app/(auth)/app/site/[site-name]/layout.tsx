import { Suspense } from "react";
import { notFound } from "next/navigation";
import asyncComponent from "~/app/hack";
import { getUser } from "~/server/rsc/user";
import { getSite } from "~/server/rsc/site";
import Loading from "~/app/(auth)/app/components/loading";
import AppSiteLayoutClient from "./layout.client";

const _AppSiteLayout = asyncComponent(
  async ({ siteName, children }: React.PropsWithChildren<{ siteName: string }>) => {
    const user = (await getUser())!;
    const siteId = user.sites.find(site => site.name === siteName)?.id;
    const site = await getSite(siteId);
    if (!site) notFound();
    return <AppSiteLayoutClient rscSite={site}>{children}</AppSiteLayoutClient>;
  }
);

export default function AppSiteLayout({
  params,
  children,
}: React.PropsWithChildren<{ params: { "site-name": string } }>) {
  // kebab-case for file names at all cost
  return (
    <Suspense fallback={<Loading />}>
      <_AppSiteLayout siteName={params["site-name"]}>{children}</_AppSiteLayout>
    </Suspense>
  );
}
