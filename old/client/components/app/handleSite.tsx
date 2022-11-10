import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

import SiteContext from "~/old/client/context/site";
import useAuth from "~/old/client/hooks/auth";
import { useSiteInit } from "~/old/client/hooks/site";

import AppLayout from "~/old/client/layouts/app";

import { SitePagesOptions } from "~/old/types/client/page.type";
import { NextPageWithLayout } from "~/old/types/client/utils.type";

const SiteContextProvider: FC<{ siteId: string; children: ReactNode }> = ({ siteId, children }) => {
  const { site, mutate } = useSiteInit(siteId);
  return <SiteContext.Provider value={{ site, mutate }}>{children}</SiteContext.Provider>;
};

const sitePages = ({ title, activeTab, removePadding, Loading, Content }: SitePagesOptions) => {
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
        <Content />
      </SiteContextProvider>
    );
  };

  Page.getLayout = (page, {}, router) => (
    <AppLayout
      title={router.query.siteName ? title(router.query.siteName as string) : "Loading"}
      type="site"
      activeTab={activeTab}
      siteName={(router.query.siteName as string | undefined) ?? ""}
      loadingScreen={<Loading />}
      removePadding={removePadding}
    >
      {page}
    </AppLayout>
  );

  return Page;
};

export { sitePages as default, SiteContextProvider };
