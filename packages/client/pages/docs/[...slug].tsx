import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { getFiles } from "@client/lib/documentation";

type URLParams = { slug: string[] };
type PageProps = { prop: string };

const DocPage: NextPage<PageProps> = ({ prop }) => {
  return (
    <div>
      <h1>{prop}</h1>
    </div>
  );
};

const getStaticPaths: GetStaticPaths<URLParams> = async () => ({
  paths: getFiles().map(slug => ({ params: { slug } })),
  fallback: false,
});

const getStaticProps: GetStaticProps<PageProps, URLParams> = async ({ params }) => ({
  props: { prop: params?.slug[params.slug.length - 1] ?? "something is wrong" },
});

export { DocPage as default, getStaticPaths, getStaticProps };
