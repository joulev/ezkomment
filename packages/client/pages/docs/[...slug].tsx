import * as runtime from "react/jsx-runtime";
import { compile, nodeTypes, run } from "@mdx-js/mdx";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ComponentProps, FC, ReactNode, useEffect, useState } from "react";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkPrism from "remark-prism";

import TagOutlinedIcon from "@mui/icons-material/TagOutlined";

import { filePaths, getFileData, navData } from "@client/lib/documentation";

import A from "@client/components/anchor";
import DocsBottomBar from "@client/components/docs/bottombar";
import DocsSidebar from "@client/components/docs/sidebar";

import { DocsData, NavData } from "@client/types/docs.type";

type URLParams = { slug: string[] };
type PageProps = DocsData & {
  navData: NavData;
  path: string[];
};

type HeadingProps = { id?: string; children: ReactNode };
const Heading: FC<HeadingProps & { level: number }> = ({ level, id, children }) => {
  const HeadingTag: keyof JSX.IntrinsicElements = `h${level as 1 | 2 | 3 | 4 | 5 | 6}`;
  return (
    <HeadingTag id={id} className="relative group">
      {children}
      {level > 1 && (
        <A
          href={`#${id}`}
          className="absolute bottom-0 right-full pr-1 opacity-0 group-hover:opacity-100 transition"
        >
          <TagOutlinedIcon fontSize="small" />
        </A>
      )}
    </HeadingTag>
  );
};

// `components` is just to avoid a warning when that prop is passed when MDX hasn't been rendered
const Loading: FC<{ components: any }> = ({ components }) => <>Loading</>;

const DocPage: NextPage<PageProps> = ({ title, content, lastModified, path, navData }) => {
  // Sorry for using any here, but since run() in @mdx-js/mdx returns Promise<any>, I can't do anything else.
  const [mdxModule, setMdxModule] = useState<any>(null);
  const Content = mdxModule ? mdxModule.default : Loading;
  useEffect(() => {
    (async () => setMdxModule(await run(content, runtime)))();
  }, [content]);
  return (
    <>
      <Head>
        <title>{title} | ezkomment Docs</title>
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <DocsSidebar navData={navData} />
        <main className="col-span-full md:col-span-2 px-6 sm:px-12 py-12 max-w-prose">
          <div style={{ height: "60px" }} className="md:hidden" />
          <article className="docs">
            <Content
              components={{
                a: (props: ComponentProps<typeof A>) => <A {...props} />,
                h1: (props: HeadingProps) => <Heading {...props} level={1} />,
                h2: (props: HeadingProps) => <Heading {...props} level={2} />,
                h3: (props: HeadingProps) => <Heading {...props} level={3} />,
                h4: (props: HeadingProps) => <Heading {...props} level={4} />,
                h5: (props: HeadingProps) => <Heading {...props} level={5} />,
                h6: (props: HeadingProps) => <Heading {...props} level={6} />,
              }}
            />
          </article>
          <hr />
          <DocsBottomBar lastModified={lastModified} path={path} />
        </main>
      </div>
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
        })
      ),
      path: params?.slug ?? [],
      navData,
      ...rest,
    },
  };
};

export { DocPage as default, getStaticPaths, getStaticProps };
