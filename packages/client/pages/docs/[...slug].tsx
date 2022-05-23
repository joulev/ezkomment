import * as runtime from "react/jsx-runtime";
import { compile, nodeTypes, run } from "@mdx-js/mdx";
import { useMDXComponents } from "@mdx-js/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkPrism from "remark-prism";

import { filePaths, getFileData, navData } from "@client/lib/documentation";

import DocsBottomBar from "@client/components/docs/bottombar";
import DocsSidebar from "@client/components/docs/sidebar";

import { DocsData, NavData } from "@client/types/docs.type";

type URLParams = { slug: string[] };
type PageProps = DocsData & {
  navData: NavData;
  path: string[];
};

const DocPage: NextPage<PageProps> = ({ title, content, lastModified, path, navData }) => {
  // Sorry for using any here, but since run() in @mdx-js/mdx returns Promise<any>, I can't do anything else.
  const [mdxModule, setMdxModule] = useState<any>(null);
  const Content = mdxModule ? mdxModule.default : () => <>Loading</>;
  useEffect(() => {
    (async () => setMdxModule(await run(content, { ...runtime, useMDXComponents })))();
  }, [content]);
  return (
    <>
      <Head>
        <title>{title} | ezkomment Docs</title>
      </Head>
      <DocsSidebar navData={navData} />
      <main className="ml-0 mt-18 lg:ml-96 lg:mt-0">
        <div className="container lg:max-w-prose py-12">
          <article className="post">
            <Content />
          </article>
          <hr />
          <DocsBottomBar lastModified={lastModified} path={path} />
        </div>
      </main>
    </>
  );
};

const getStaticPaths: GetStaticPaths<URLParams> = () => ({
  paths: filePaths.map(slug => ({ params: { slug } })),
  fallback: false,
});

const getStaticProps: GetStaticProps<PageProps, URLParams> = async ({ params }) => {
  const { content, ...rest } = await getFileData(params?.slug ?? []); // [] case never happens, but TS complains
  return {
    props: {
      content: String(
        await compile(content, {
          outputFormat: "function-body",
          rehypePlugins: [
            // https://github.com/orgs/mdx-js/discussions/2023#discussioncomment-2649772
            [rehypeRaw, { passThrough: nodeTypes }],
            rehypeSlug,
          ],
          remarkPlugins: [remarkPrism],
          providerImportSource: "@mdx-js/react",
        })
      ),
      path: params?.slug ?? [],
      navData,
      ...rest,
    },
  };
};

export { DocPage as default, getStaticPaths, getStaticProps };
