import { GetServerSideProps, NextPage } from "next";

import AppLayout from "@client/layouts/app";

import site from "@client/sample/site.json";

type Site = typeof site;
type Props = { site: Site };

const SiteOverview: NextPage<Props> = ({ site }) => (
  <AppLayout title={site.name} type="site" activeTab="all" siteName={site.name}>
    <div>Hello, world</div>
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async () => ({ props: { site } });

export default SiteOverview;
