import { Suspense } from "react";
import { notFound } from "next/navigation";
import asyncComponent from "~/app/hack";
import { getUser } from "~/server/rsc/user";
import { getSite } from "~/server/rsc/site";
import AppLoading from "../../layout-loading";
import AppSiteLayoutClient from "./layout.client";

type Params = {
  siteName: string;
};

const _AppSiteLayout = asyncComponent(
  async ({ siteName, children }: React.PropsWithChildren<Params>) => {
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
}: React.PropsWithChildren<{ params: Params }>) {
  return (
    <Suspense fallback={<AppLoading />}>
      <_AppSiteLayout siteName={params.siteName}>{children}</_AppSiteLayout>
    </Suspense>
  );
}
