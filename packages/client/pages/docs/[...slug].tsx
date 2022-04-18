import clsx from "clsx";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { getFileData, getFiles } from "@client/lib/documentation";
import parseBuildId from "@client/lib/parseBuildId";

import A from "@client/components/anchor";
import Input from "@client/components/forms/input";
import ModeSwitcher from "@client/components/modeSwitcher";

import { BuildInfo } from "@client/types/utils.type";

type URLParams = { slug: string[] };
type PageProps = { title: string; content: string };

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
            "bg-white dark:bg-black border-r border-neutral-300 dark:border-neutral-700"
          )}
        >
          <div>
            <A
              href="/docs"
              notStyled
              className={clsx(
                "relative after:absolute after:content-['docs'] after:left-full after:-top-full after:ml-3",
                "after:text-indigo-500 after:uppercase",
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
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique animi aperiam eum
            hic atque est quod aliquam maxime repellat nostrum! Dolores similique doloremque quae
            enim aperiam velit vitae rerum sit placeat dignissimos, natus temporibus corporis
            recusandae porro quisquam fugiat ratione optio amet. Consequuntur aperiam rem nisi, qui
            omnis architecto ex suscipit, mollitia aspernatur eaque nam placeat blanditiis a
            consectetur, impedit natus laboriosam nesciunt dolorum. Tempore consequatur sed, nisi,
            laborum natus impedit totam distinctio enim facilis provident sunt facere numquam veniam
            esse aperiam. Provident repellat quos vero harum, adipisci tempore, impedit suscipit
            voluptas eos, quisquam dignissimos perspiciatis labore fugit quibusdam iste.
          </div>
          <footer className="flex flex-row justify-between items-center">
            {process.env.NODE_ENV === "development" && (
              <span className="text-neutral-500 font-mono">dev</span>
            )}
            {process.env.NODE_ENV === "production" && !buildId && (
              <span className="text-neutral-500">Loading&hellip;</span>
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
          <Markdown>{content}</Markdown>
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
