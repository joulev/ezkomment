import clsx from "clsx";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, Fragment, ReactNode, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";

import useBuildId from "@client/hooks/buildId";
import { filePaths, getFileData, navData } from "@client/lib/documentation";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";
import Input from "@client/components/forms/input";
import ModeSwitcher from "@client/components/modeSwitcher";

import { DocsData, NavData } from "@client/types/docs.type";

import logoText from "@client/public/images/logo-text.svg";

type URLParams = { slug: string[] };
type PageProps = DocsData & {
  navData: NavData;
  path: string[];
};

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

const Nav: FC<{ navData: NavData }> = ({ navData }) => (
  <nav className="flex-grow min-h-0 overflow-y-auto">
    {Object.entries(navData).map(([topLevel, data], i) =>
      typeof data === "string" ? (
        <SidebarLink key={i} href={`/docs/${topLevel}`}>
          {data}
        </SidebarLink>
      ) : (
        <Fragment key={i}>
          <h2 className="text-sm uppercase tracking-widest font-normal mt-6 mb-3">
            {data.sectionTitle}
          </h2>
          {Object.entries(data.pages).map(([secondLevel, title], j) => (
            <SidebarLink key={j} href={`/docs/${topLevel}/${secondLevel}`}>
              {title}
            </SidebarLink>
          ))}
        </Fragment>
      )
    )}
  </nav>
);

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
  const buildId = useBuildId();
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  const [screenHeight, setScreenHeight] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScreenHeight = () => setScreenHeight(window.innerHeight);

    window.addEventListener("resize", handleScreenHeight);
    window.addEventListener("scroll", handleScreenHeight);
    handleScreenHeight();
    return () => {
      window.removeEventListener("resize", handleScreenHeight);
      window.removeEventListener("scroll", handleScreenHeight);
    };
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
            "fixed md:sticky top-0 inset-x-0 md:left-0 md:right-auto z-40 md:z-auto flex flex-col gap-6",
            "overflow-hidden px-6 sm:px-12 md:px-6 md:pt-12 md:pb-6",
            "bg-card md:!h-screen md:border-b-0 md:border-r border-card transition-all", // sorry for using !important
            navbarCollapsed ? "border-b py-3" : "border-b-0 py-6"
          )}
          style={{ height: navbarCollapsed ? "60px" : screenHeight + "px" }}
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
              <Image src={logoText} alt="ezkomment" layout="responsive" width={397} height={80} />
            </A>
            <button
              className={clsx(
                "md:hidden text-neutral-600 dark:text-neutral-400 rounded p-1 transition leading-none",
                "hover:text-neutral-900 dark:hover:text-neutral-100"
              )}
              onClick={() => setNavbarCollapsed(!navbarCollapsed)}
            >
              {navbarCollapsed ? <DensityMediumOutlinedIcon /> : <ClearOutlinedIcon />}
            </button>
          </div>
          <Input icon={SearchOutlinedIcon} type="text" placeholder="Search" />
          <Nav navData={navData} />
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
          <div className="text-center">Was this page helpful?</div>
          <div className="flex flex-row justify-center gap-6 mt-3">
            <Button variant="tertiary" icon={CheckOutlinedIcon}>
              Yes
            </Button>
            <Button variant="tertiary" icon={ClearOutlinedIcon}>
              No
            </Button>
          </div>
          <hr />
          <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-baseline gap-y-3 text-sm">
            <div className="text-muted">
              Last modified:{" "}
              <time title={lastModified}>
                {lastModified === "unknown"
                  ? "unknown"
                  : formatDistanceToNowStrict(parseISO(lastModified), { addSuffix: true })}
              </time>
            </div>
            <A href={`https://github.com/joulev/ezkomment/blob/main/docs/${path.join("/")}.md`}>
              Edit this page on GitHub
            </A>
          </div>
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
