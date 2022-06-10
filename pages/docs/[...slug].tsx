import * as runtime from "react/jsx-runtime";
import { compile, nodeTypes, run } from "@mdx-js/mdx";
import { useMDXComponents } from "@mdx-js/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkPrism from "remark-prism";

import { filePaths, getFileData, navData } from "~/lib/client/documentation";
import getOgImage from "~/lib/client/getOgImage";

import DocsBottomBar from "~/components/docs/bottombar";
import DocsSidebar from "~/components/docs/sidebar";
import Seo from "~/components/seo";

import { SeoProps } from "~/types/components.type";
import { DocsData, NavData } from "~/types/docs.type";

type URLParams = { slug: string[] };
type PageProps = Omit<DocsData, "title"> & {
  navData: NavData;
  path: string[];
  seo: SeoProps;
};

const DocPage: NextPage<PageProps> = ({ content, lastModified, path, navData, seo }) => {
  // Sorry for using any here, but since run() in @mdx-js/mdx returns Promise<any>, I can't do anything else.
  const [mdxModule, setMdxModule] = useState<any>(null);
  const Content = mdxModule ? mdxModule.default : () => <>Loading</>;
  useEffect(() => {
    (async () => setMdxModule(await run(content, { ...runtime, useMDXComponents })))();
  }, [content]);
  return (
    <>
      <Seo {...seo} />
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
  const { content, title, ...rest } = await getFileData(params?.slug ?? []); // [] case never happens, but TS complains
  const image = await getOgImage({ title, label: "docs" });
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
      seo: {
        title: `${title} | ezkomment Docs`,
        url: `https://ezkomment.joulev.dev/docs/${params?.slug?.join("/")}`,
        image,
      },
    },
  };
};

export { DocPage as default, getStaticPaths, getStaticProps };
