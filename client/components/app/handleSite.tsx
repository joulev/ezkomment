import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";

import SiteContext from "~/client/context/site";
import useAuth from "~/client/hooks/auth";
import { useSiteInit } from "~/client/hooks/site";

import AppLayout from "~/client/layouts/app";

import { SitePagesOptions } from "~/types/client/page.type";
import { NextPageWithLayout } from "~/types/client/utils.type";

type Props = { siteName: string };
type Param = Props;

const SiteContextProvider: FC<{ siteId: string; Content: FC }> = ({ siteId, Content }) => {
  const { site, mutate } = useSiteInit(siteId);
  return (
    <SiteContext.Provider value={{ site, mutate }}>
      <Content />
    </SiteContext.Provider>
  );
};

const sitePages = ({ title, activeTab, removePadding, Loading, Content }: SitePagesOptions) => {
  const Page: NextPageWithLayout<Props> = ({ siteName }) => {
    const { user } = useAuth();
    const router = useRouter();
    if (!user) return <Loading />;
    const site = user.sites.find(s => s.name === siteName);
    if (!site) {
      // I'm not even sure if this is the recommended way to do a "client-side" 404, but it works and
      // it is *not* a workaround (I think).
      router.push("/404", router.asPath);
      return null;
    }
    return <SiteContextProvider siteId={site.id} Content={Content} />;
  };
  Page.getLayout = (page, { siteName }) => (
    <AppLayout
      title={siteName ? title(siteName) : "Loading"}
      type="site"
      activeTab={activeTab}
      siteName={siteName}
      loadingScreen={<Loading />}
      removePadding={removePadding}
    >
      {page}
    </AppLayout>
  );
  const getStaticPaths: GetStaticPaths<Param> = () => ({ paths: [], fallback: true });
  const getStaticProps: GetStaticProps<Props, Param> = ({ params }) =>
    params && params.siteName ? { props: { siteName: params.siteName } } : { notFound: true };
  return { Page, getStaticPaths, getStaticProps };
};

export default sitePages;
