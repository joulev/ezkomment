/* eslint-disable @next/next/no-page-custom-font, @next/next/no-img-element */
import clsx from "clsx";
import Head from "next/head";
import { useRouter } from "next/router";

import { NextPageWithLayout } from "@client/types/utils.type";

const OpenGraphImageGenerator: NextPageWithLayout = () => {
  const router = useRouter();
  const title = router.query.title as string | undefined;
  const label = router.query.label as string | undefined;
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        className={clsx(
          "font-['Inter'] w-[1200px] h-[630px] px-32 py-40",
          "flex flex-col justify-center gap-12 bg-gradient-to-br from-indigo-400 to-indigo-600 text-white",
          title || "items-center",
          title && title.length > 32 ? "text-[72px]" : "text-[80px]"
        )}
      >
        <div className={label && "flex flex-row gap-8 divide-x divide-neutral-100 items-center"}>
          <img src="/images/logo-text-white.svg" alt="you shouldn't see this" />
          {label && <div className="uppercase font-light pl-8 text-[48px]">{label}</div>}
        </div>
        {title ? (
          <div className="font-semibold leading-tight line-clamp-2 -my-4">{title}</div>
        ) : (
          <div className="font-light text-white tracking-tighter">
            Commenting made <span className="font-extrabold tracking-normal">easy</span>.
          </div>
        )}
      </div>
    </>
  );
};

export default OpenGraphImageGenerator;
