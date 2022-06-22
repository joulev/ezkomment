import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

import PageContext from "~/client/context/page";
import useAuth from "~/client/hooks/auth";
import { usePageInit } from "~/client/hooks/page";
import { useSite } from "~/client/hooks/site";

import AppLayout from "~/client/layouts/app";

import { PagePagesOptions } from "~/types/client/page.type";
import { NextPageWithLayout } from "~/types/client/utils.type";

import { SiteContextProvider } from "./handleSite";

const PageContextProvider: FC<{ pageId: string; children: ReactNode }> = ({ pageId, children }) => {
  const { page, mutate } = usePageInit(pageId);
  return <PageContext.Provider value={{ page, mutate }}>{children}</PageContext.Provider>;
};

const pagePages = ({ title, activeTab, Loading, Content }: PagePagesOptions) => {
  const UnderSiteContext: FC = () => {
    const { site } = useSite();
    const router = useRouter();

    if (!site || !router.isReady) return <Loading />;
    const page = site.pages.find(p => p.id === router.query.pageId);
    if (!page) {
      if (!router.query.loading || router.query.loading !== "1") {
        router.push("/404", router.asPath);
        return null;
      } else return <Loading />;
    }
    return (
      <PageContextProvider pageId={page.id}>
        <Content />
      </PageContextProvider>
    );
  };

  const Page: NextPageWithLayout = () => {
    const { user } = useAuth();
    const router = useRouter();

    if (!user || !router.isReady) return <Loading />;
    const site = user.sites.find(s => s.name === router.query.siteName);
    if (!site) {
      if (!router.query.loading || router.query.loading !== "1") {
        router.push("/404", router.asPath);
        return null;
      } else return <Loading />;
    }
    return (
      <SiteContextProvider siteId={site.id}>
        <UnderSiteContext />
      </SiteContextProvider>
    );
  };

  Page.getLayout = (page, {}, router) => (
    <AppLayout
      title={router.query.siteName ? title(router.query.siteName as string) : "Loading"}
      type="page"
      activeTab={activeTab}
      siteName={(router.query.siteName as string | undefined) ?? ""}
      pageId={(router.query.pageId as string | undefined) ?? ""}
      loadingScreen={<Loading />}
    >
      {page}
    </AppLayout>
  );

  return Page;
};

export default pagePages;
