import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { getFileData, getFiles } from "@client/lib/documentation";

type URLParams = { slug: string[] };
type PageProps = { title: string; content: string };

const DocPage: NextPage<PageProps> = ({ title, content }) => (
  <>
    <Head>
      <title>{title} | ezkomment Docs</title>
    </Head>
    <Markdown>{content}</Markdown>
  </>
);

const getStaticPaths: GetStaticPaths<URLParams> = () => ({
  paths: getFiles().map(slug => ({ params: { slug } })),
  fallback: false,
});

const getStaticProps: GetStaticProps<PageProps, URLParams> = ({ params }) => {
  if (!params) return { props: { content: "something's wrong", title: "something's wrong" } };
  const { content, data } = matter(getFileData(params.slug));

  return {
    props: { content, title: data.title as string },
  };
};

export { DocPage as default, getStaticPaths, getStaticProps };
