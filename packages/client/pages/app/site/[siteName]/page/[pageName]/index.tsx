import { GetServerSideProps, NextPage } from "next";

import AppLayout from "@client/layouts/app";

import page from "@client/sample/page.json";

type Page = typeof page;
type Props = { page: Page };

const SiteOverview: NextPage<Props> = ({ page }) => (
  <AppLayout
    title={`Page ${page.id}`}
    type="page"
    activeTab="all"
    siteName="blog-app"
    pageId={page.id}
  >
    Hello world
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async () => ({ props: { page } });

export default SiteOverview;
