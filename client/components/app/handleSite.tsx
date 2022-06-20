import { useRouter } from "next/router";
import { FC, useEffect } from "react";

import SiteContext from "~/client/context/site";
import useAuth from "~/client/hooks/auth";
import { useSiteInit } from "~/client/hooks/site";

import AppLayout from "~/client/layouts/app";

import { SitePagesOptions } from "~/types/client/page.type";
import { NextPageWithLayout } from "~/types/client/utils.type";

const SiteContextProvider: FC<{ siteId: string; Content: FC }> = ({ siteId, Content }) => {
  const { site, mutate } = useSiteInit(siteId);
  return (
    <SiteContext.Provider value={{ site, mutate }}>
      <Content />
    </SiteContext.Provider>
  );
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
    return <SiteContextProvider siteId={site.id} Content={Content} />;
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

export default sitePages;
