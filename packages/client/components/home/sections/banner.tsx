import clsx from "clsx";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";

import useTheme from "@client/hooks/theme";

import A from "@client/components/anchor";

import logoTextWhite from "@client/public/images/logo-text-white.svg";

function useBackgroundRef() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const appScreenshotRef = useRef<HTMLDivElement>(null);
  const [backgroundHeight, setBackgroundHeight] = useState("100vh");
  const handler = () =>
    setBackgroundHeight(
      bannerRef.current && appScreenshotRef.current
        ? `${bannerRef.current.clientHeight - appScreenshotRef.current.clientHeight / 2}px`
        : "100vh"
    );
  useEffect(handler, [bannerRef, appScreenshotRef]);
  useEffect(() => {
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return { bannerRef, appScreenshotRef, backgroundHeight };
}

const HomeBanner: FC = () => {
  const theme = useTheme();
  const { bannerRef, appScreenshotRef, backgroundHeight } = useBackgroundRef();
  return (
    <section className="relative text-white mb-36">
      <div
        className="absolute top-0 inset-x-0 bg-gradient-to-br from-indigo-400 to-indigo-600"
        style={{ height: backgroundHeight }}
      />
      <div
        className="relative mx-auto pt-36 container lg:max-w-screen-md xl:max-w-screen-lg text-center"
        ref={bannerRef}
      >
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
          href="/auth"
          className={clsx(
            "inline-block border-2 rounded-lg border-white sm:text-xl px-9 py-3 transition mb-3",
            "bg-white text-indigo-500 hover:bg-transparent hover:text-white"
          )}
        >
          Get started!
        </A>
        <div ref={appScreenshotRef}>
          <Image
            src={theme === "dark" ? "/images/home/app-dark.png" : "/images/home/app-light.png"}
            alt="Screenshot"
            width={2216}
            height={1674}
            layout="responsive"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
