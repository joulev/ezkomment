import clsx from "clsx";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { getFileData, getFiles } from "@client/lib/documentation";
import parseBuildId from "@client/lib/parseBuildId";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";
import Input from "@client/components/forms/input";
import ModeSwitcher from "@client/components/modeSwitcher";

import { BuildInfo } from "@client/types/utils.type";

type URLParams = { slug: string[] };
type PageProps = { title: string; content: string };

const SidebarLink: FC<{ href: string; children: ReactNode }> = ({ href, children }) => {
  const router = useRouter();
  return (
    <A
      href={href}
      notStyled
      className={clsx(
        "block mb-6 transition-all",
        router.asPath === href
          ? "text-primary font-semibold"
          : "text-muted hover:text-neutral-900 dark:hover:text-neutral-100"
      )}
    >
      {children}
    </A>
  );
};

const SidebarSection: FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="text-sm uppercase tracking-widest font-normal mt-6 mb-3">{children}</h2>
);

const DocPage: NextPage<PageProps> = ({ title, content }) => {
  const [buildId, setBuildId] = useState<BuildInfo | null>(null);
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getBuildId: string = JSON.parse(
      document.querySelector("#__NEXT_DATA__")?.textContent as string
    ).buildId;
    setBuildId(parseBuildId(getBuildId));

    const handleResize = () => setNavbarCollapsed(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => setNavbarCollapsed(true), [router.asPath]);

  return (
    <>
      <Head>
        <title>{title} | ezkomment Docs</title>
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div
          className={clsx(
            "sticky top-0 inset-x-0 md:left-0 md:right-auto flex flex-col gap-6",
            "overflow-hidden px-6 sm:px-12 md:px-6 md:pt-12 md:pb-6",
            "bg-card md:h-screen md:border-b-0 md:border-r border-card transition-all",
            navbarCollapsed ? "h-[60px] border-b py-3" : "h-screen border-b-0 py-6"
          )}
        >
          <div className="flex flex-row justify-between items-center">
            <A
              href="/"
              notStyled
              className={clsx(
                "relative block h-[30px] w-[calc(397px/80*30)]",
                "after:absolute after:content-['docs'] after:left-full after:top-1 after:ml-1.5",
                "after:text-primary after:uppercase after:text-sm",
                "after:bg-indigo-100 dark:after:bg-indigo-900 dark:after:bg-opacity-50",
                "after:px-1.5 after:py-0.5 after:rounded"
              )}
            >
              <Image
                src="/images/logo-text.svg"
                alt="ezkomment"
                layout="responsive"
                width={397}
                height={80}
              />
            </A>
            <Button
              icon={navbarCollapsed ? MenuOutlinedIcon : ClearOutlinedIcon}
              variant="tertiary"
              className="md:hidden"
              onClick={() => setNavbarCollapsed(!navbarCollapsed)}
            />
          </div>
          <Input icon={SearchOutlinedIcon} type="text" placeholder="Search" />
          <div className="flex-grow min-h-0 overflow-y-auto">
            <SidebarLink href="/docs/getting-started">Getting started</SidebarLink>
            <SidebarSection>Basic features</SidebarSection>
            <SidebarLink href="/docs/basic-features/pages">Pages</SidebarLink>
          </div>
          <footer className="flex flex-row justify-between items-center">
            {process.env.NODE_ENV === "development" && (
              <span className="text-muted font-mono">dev</span>
            )}
            {process.env.NODE_ENV === "production" && !buildId && (
              <span className="text-muted">Loading&hellip;</span>
            )}
            {process.env.NODE_ENV === "production" && buildId && (
              <A
                href={`https://github.com/joulev/ezkomment/commit/${buildId.hash}`}
                className="font-mono"
              >
                {buildId.hash}
              </A>
            )}
            <ModeSwitcher />
          </footer>
        </div>
        <main className="col-span-full md:col-span-2 px-6 sm:px-12 py-12 max-w-prose">
          <div className="docs">
            <ReactMarkdown
              components={{
                a: ({ node, children, ...props }) => <A {...props}>{children}</A>,
                // why tf did I need 30 lines in another project just for the same thing?
                pre: ({ children }) => <>{children}</>,
                // https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
                code: ({ node, inline, className, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      language={match[1]}
                      {...props}
                      // No thanks I will use my own CSS
                      useInlineStyles={false}
                      codeTagProps={{ style: undefined }}
                    />
                  ) : (
                    <code className={className} {...props} />
                  );
                },
              }}
              rehypePlugins={[rehypeRaw]}
            >
              {content}
            </ReactMarkdown>
          </div>
          <hr />
          <div className="text-center">Was this page helpful?</div>
          <div className="flex flex-row justify-center gap-6 mt-3">
            <Button variant="tertiary" icon={CheckOutlinedIcon}>
              Yes
            </Button>
            <Button variant="tertiary" icon={ClearOutlinedIcon}>
              No
            </Button>
          </div>
        </main>
      </div>
    </>
  );
};

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
