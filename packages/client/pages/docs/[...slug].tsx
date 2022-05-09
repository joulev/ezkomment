import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { FC, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

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

const Heading: FC<{ level: number; id?: string; children: ReactNode }> = ({
  level,
  id,
  children,
}) => {
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

const DocPage: NextPage<PageProps> = ({ title, content, lastModified, path, navData }) => {
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
            <ReactMarkdown
              components={{
                a: ({ node, children, ...props }) => <A {...props}>{children}</A>,
                // for headings: `level` is already provided (yes I feel like cheating)
                h1: props => <Heading {...props} />,
                h2: props => <Heading {...props} />,
                h3: props => <Heading {...props} />,
                h4: props => <Heading {...props} />,
                h5: props => <Heading {...props} />,
                h6: props => <Heading {...props} />,
                // why tf did I need 30 lines in another project just for the same thing?
                pre: ({ children }) => <>{children}</>,
                // https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
                code: ({ node, inline, className, style, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      language={match[1]}
                      {...props}
                      // No thanks I will use my own CSS
                      useInlineStyles={false}
                      codeTagProps={{ style }}
                    >
                      {children as string}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} style={style} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
              rehypePlugins={[rehypeRaw, rehypeSlug]}
            >
              {content}
            </ReactMarkdown>
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
  if (!params)
    return {
      props: { content: "something's wrong", title: "", lastModified: "", path: [], navData },
    };
  return {
    props: {
      ...(await getFileData(params.slug)),
      path: params.slug,
      navData,
    },
  };
};

export { DocPage as default, getStaticPaths, getStaticProps };
