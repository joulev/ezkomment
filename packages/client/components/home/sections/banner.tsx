import clsx from "clsx";
import Image from "next/image";
import { FC, useRef } from "react";

import A from "@client/components/anchor";

import imageApp from "@client/public/images/home/app-screenshot.png";
import logoTextWhite from "@client/public/images/logo-text-white.svg";

const HomeBanner: FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const appScreenshotRef = useRef<HTMLDivElement>(null);
  return (
    <section className="relative text-white px-6 sm:px-10 mb-36">
      <div
        className="absolute top-0 inset-x-0 bg-gradient-to-br from-indigo-400 to-indigo-600"
        style={{
          height:
            bannerRef.current && appScreenshotRef.current
              ? `${bannerRef.current.clientHeight - appScreenshotRef.current.clientHeight / 2}px`
              : "100vh",
        }}
      />
      <div className="relative mx-auto pt-36 w-full lg:w-3/4 xl:w-2/3 text-center" ref={bannerRef}>
        <div
          className={clsx(
            "max-w-[calc(397px*0.6)] max-h-[calc(80px*0.6)]", // LOL
            "sm:max-w-[calc(397px*0.75)] sm:max-h-[calc(397px*0.75)] mx-auto"
          )}
        >
          <Image src={logoTextWhite} alt="logo" layout="responsive" width={397} height={80} />
        </div>
        <h1 className="text-5xl sm:text-6xl font-extralight">
          Commenting made&nbsp;
          <span className="font-extrabold">easy</span>.
        </h1>
        <div className="text-2xl font-light mb-12">
          No complicated backend configuration. Add a comment section anywhere &ndash; even if you
          use plain HTML, we got you covered.
        </div>
        <A
          notStyled
          role="button"
          href="/app/auth/signup"
          className={clsx(
            "inline-block border-2 rounded-lg border-white sm:text-xl px-9 py-3 transition mb-3",
            "bg-white text-indigo-500 hover:bg-transparent hover:text-white"
          )}
        >
          Get started!
        </A>
        <p className="font-light text-sm sm:text-base mb-10">
          Already a user?{" "}
          <A
            notStyled
            href="/app/auth/signin"
            className="font-bold underline underline-offset-4 transition hover:text-neutral-300"
          >
            Sign in
          </A>
        </p>
        <div ref={appScreenshotRef}>
          <Image src={imageApp} alt="Screenshot" width={2442} height={1702} layout="responsive" />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;