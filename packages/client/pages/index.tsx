import clsx from "clsx";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import { useScreenWidth } from "@client/context/screenWidth";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";
import Footer from "@client/layouts/parts/footer";

type SectionImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const LandingNavbar: FC<{ show?: boolean }> = ({ show }) => {
  const screenWidth = useScreenWidth();
  return (
    <nav
      className={clsx(
        "fixed z-40 top-0 inset-x-0 px-6 sm:px-10",
        "bg-white dark:bg-black border-b border-neutral-300 dark:border-neutral-700"
      )}
    >
      <div
        className={clsx(
          show ? "h-[72px]" : "h-0",
          "mx-auto w-full lg:w-5/6 xl:w-4/5 flex flex-row justify-between items-center transition-all overflow-hidden"
        )}
      >
        <button
          className="w-[calc(397px*0.4)]"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Image
            src="/images/logo-text.svg"
            alt="logo"
            layout="responsive"
            width={397}
            height={80}
          />
        </button>
        <div className="flex flex-row gap-6">
          <Button variant="tertiary" href="/app" className="hidden sm:block">
            Log in
          </Button>
          <Button href="/app" icon={screenWidth === "xs" ? LoginOutlinedIcon : undefined}>
            {screenWidth === "xs" ? undefined : "Get started"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

const Section: FC<{ image: SectionImage; children: ReactNode }> = ({ image, children }) => (
  <section className="px-6 sm:px-10 my-48">
    <div className="mx-auto w-full lg:w-5/6 xl:w-4/5 grid grid-cols-12 gap-y-9 lg:gap-x-12">
      <div className="order-last col-span-full lg:order-first lg:col-span-5">{children}</div>
      <div className="order-first col-span-full lg:order-last lg:col-span-7">
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-full mx-auto">
          <Image
            layout="responsive"
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
        </div>
      </div>
    </div>
  </section>
);

const Home: NextPage = () => {
  const appScreenshotRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => setScrollY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>ezkomment: Commenting made easy</title>
      </Head>
      <LandingNavbar show={scrollY > 300} />
      <section className="relative text-white px-6 sm:px-10 pt-36 mb-36">
        <div
          className="absolute top-0 inset-x-0 bg-gradient-to-br from-indigo-400 to-indigo-600"
          style={{
            // This doesn't exactly yield the midway of appScreenshot for some reasons. However,
            // it's still close enough, and the bug only happens when the user resizes the browser,
            // which doesn't happen often.
            height:
              (appScreenshotRef.current?.offsetTop ?? 0) +
              (appScreenshotRef.current?.clientHeight ?? 0) / 2 +
              96 +
              "px",
          }}
        />
        <div className="relative mx-auto w-full lg:w-3/4 xl:w-2/3 text-center">
          <div
            className={clsx(
              "max-w-[calc(397px*0.6)] max-h-[calc(80px*0.6)]", // LOL
              "sm:max-w-[calc(397px*0.75)] sm:max-h-[calc(397px*0.75)] mx-auto"
            )}
          >
            <Image
              src="/images/logo-text-white.svg"
              alt="logo"
              layout="responsive"
              width={397}
              height={80}
            />
          </div>
          <h1 className="text-4xl sm:text-6xl font-extralight">
            Commenting made&nbsp;
            <span className="font-extrabold">easy</span>.
          </h1>
          <div className="text-lg sm:text-2xl font-light mb-12">
            No complicated backend configuration. Add a comment section anywhere &ndash; even if you
            use plain HTML, we got you covered.
          </div>
          <A
            notStyled
            role="button"
            href="/app"
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
              href="/app"
              className="font-bold underline underline-offset-4 transition hover:text-neutral-300"
            >
              Log in
            </A>
          </p>
          <div ref={appScreenshotRef}>
            <Image
              src="/images/landing/app-screenshot.png"
              alt="App screenshot"
              width={2442}
              height={1702}
              layout="responsive"
            />
          </div>
        </div>
      </section>
      <Section
        image={{
          src: "/images/landing/iframe-sample.png",
          alt: "Iframe sample",
          width: 1422,
          height: 682,
        }}
      >
        <h2 className="text-4xl">Plain HTML is enough</h2>
        <p>
          You never have to worry about backend, server, anything. Simply add an{" "}
          <code>&lt;iframe&gt;</code> to your HTML and you&apos;re all set!
        </p>
        <p>
          Work out of the box for all tools and frameworks: Jekyll, React, Vue, you name it. Heck,
          it even works for good old plain HTML.
        </p>
        <Button>See it in action</Button>
      </Section>
      <Section
        image={{
          src: "/images/landing/moderation.png",
          alt: "Moderation tool",
          width: 1058,
          height: 538,
        }}
      >
        <h2 className="text-4xl">Moderating your comments</h2>
        <p>
          Built-in moderation tool for your comments. All comments need to be manually approved by
          you before they go public.
        </p>
        <p>Think it&apos;s not worth the work? You can disable it at any time!</p>
        <Button>Learn more</Button>
      </Section>
      <Section
        image={{
          src: "/images/landing/customisation.png",
          alt: "Customisation",
          width: 1296,
          height: 1174,
        }}
      >
        <h2 className="text-4xl">Customising to your heart&apos;s content</h2>
        <p>
          You can change the look and feel of your comments section to your liking and your
          page&apos;s design: the HTML and CSS of the comment section can be completely customised.
          Oh, and you can even have dark mode.
        </p>
        <p>
          The <A href="https://microsoft.github.io/monaco-editor">Monaco editor</A>, which also
          powers <A href="https://code.visualstudio.com">Visual Studio Code</A>, is provided to help
          you do almost anything you want.
        </p>
        <Button>Learn more</Button>
      </Section>
      <Section
        image={{
          src: "/images/landing/api-sample.png",
          alt: "API demonstration",
          width: 1422,
          height: 682,
        }}
      >
        <h2 className="text-4xl">Powerful API for power users</h2>
        <p>
          With the powerful API provided, you can really do anything you want with the comments.
          Absolutely zero restrictions on your creativity, be it custom JavaScript, fetching
          additional resources, paginations, etc.
        </p>
        <p>
          It&apos;s even <em>more</em> powerful, feature-rich than the built-in tools above.
        </p>
        <Button>Learn more</Button>
      </Section>
      <section className="px-6 sm:px-10 my-48">
        <div className="mx-auto w-full lg:w-5/6 xl:w-4/5 text-center">
          <h2 className="text-4xl">&hellip; and much more!</h2>
          <p>Why not join now to play with it yourself?</p>
          <div className="flex flex-col sm:flex-row gap-x-6 gap-y-3 justify-center">
            <Button href="/app">Get started for free</Button>
            <Button variant="tertiary">Read the docs</Button>
          </div>
        </div>
      </section>
      <Footer className="px-6 sm:px-10" containerClasses="mx-auto w-full lg:w-5/6 xl:w-4/5" />
    </>
  );
};

export default Home;
