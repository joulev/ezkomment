import clsx from "clsx";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
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
  useEffect(() => {
    const getBuildId: string = JSON.parse(
      document.querySelector("#__NEXT_DATA__")?.textContent as string
    ).buildId;
    setBuildId(parseBuildId(getBuildId));
  }, []);

  return (
    <>
      <Head>
        <title>{title} | ezkomment Docs</title>
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div
          className={clsx(
            "hidden md:flex sticky top-0 h-screen pt-12 pb-6 px-6 lg:px-12 flex-col gap-6",
            "bg-card border-r border-card"
          )}
        >
          <div>
            <A
              href="/docs"
              notStyled
              className={clsx(
                "relative after:absolute after:content-['docs'] after:left-full after:-top-full after:ml-3",
                "after:text-primary after:uppercase",
                "after:bg-indigo-100 dark:after:bg-indigo-900 dark:after:bg-opacity-50",
                "after:px-3 after:py-1 after:rounded after:hidden lg:after:block"
              )}
            >
              <Image
                src="/images/logo-text.svg"
                alt="ezkomment"
                width={397 * 0.4}
                height={80 * 0.4}
              />
            </A>
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
        <main className="col-span-full md:col-span-2 p-12 max-w-prose">
          <div className="docs">
            <Markdown
              options={{
                overrides: {
                  a: {
                    component: A,
                  },
                },
              }}
            >
              {content}
            </Markdown>
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
