import { Suspense } from "react";
import { notFound } from "next/navigation";
import asyncComponent from "~/app/hack";
import { getUser } from "~/server/rsc/user";
import { getPage } from "~/server/rsc/page";
import Loading from "~/app/(auth)/app/components/loading";
import AppPageLayoutClient from "./layout.client";

const _AppPageLayout = asyncComponent(
  async ({
    siteName,
    pageId,
    children,
  }: React.PropsWithChildren<{ siteName: string; pageId: string }>) => {
    const user = (await getUser())!;
    const siteId = user.sites.find(site => site.name === siteName)?.id;
    const page = await getPage(pageId);
    if (!siteId || !page || page.siteId !== siteId) notFound();
    return <AppPageLayoutClient rscPage={page}>{children}</AppPageLayoutClient>;
  }
);

export default function AppPageLayout({
  params,
  children,
}: React.PropsWithChildren<{ params: { "site-name": string; "page-id": string } }>) {
  // kebab-case for file names at all cost
  return (
    <Suspense fallback={<Loading />}>
      <_AppPageLayout siteName={params["site-name"]} pageId={params["page-id"]}>
        {children}
      </_AppPageLayout>
    </Suspense>
  );
}
