import Image from "next/legacy/image";
import { FC } from "react";

import useTheme from "~/client/hooks/theme";

import Button from "~/client/components/buttons";

import darkScreen from "~/public/images/home/app-dark.png";
import lightScreen from "~/public/images/home/app-light.png";
import logoText from "~/public/images/logo-text.svg";

const Hero: FC = () => {
  const mode = useTheme();
  return (
    <section className="overflow-x-hidden my-36 md:my-24 lg:my-18">
      <div className="container grid grid-cols-1 md:grid-cols-12 gap-6 xl:gap-12 items-center">
        <div className="md:col-span-7 text-center md:text-left flex flex-col gap-9 lg:gap-12">
          <div>
            <div className="w-[calc(397px/80*36)] h-9 lg:w-[calc(397px/80*48)] lg:h-12 inline-block">
              <Image src={logoText} alt="logo" layout="responsive" />
            </div>
          </div>
          <h1 className="font-black text-5xl lg:text-6xl xl:text-7xl !leading-[0.85] my-0">
            Commenting made&nbsp;
            <span className="text-gradient from-blue-500 to-violet-500">easy</span>
          </h1>
          <div className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl lg:text-2xl">
            No complicated backend configuration. Add a comment section anywhere &ndash; even if you
            use plain HTML, we got you covered.
          </div>
          <div className="flex flex-row gap-6 justify-center md:justify-start">
            <Button href="/auth" className="inline-block lg:text-xl px-9 py-3">
              Get started
            </Button>
            <Button
              href="https://demo.ezkomment.joulev.dev"
              className="inline-block lg:text-xl px-9 py-3"
              variant="tertiary"
            >
              View demo
            </Button>
          </div>
        </div>
        <div className="hidden md:block md:col-span-5 relative h-[calc(1590px/3.9)] lg:h-[calc(1590px/2.5)]">
          <div className="absolute left-0 inset-y-0 w-[calc(2120px/4)] lg:w-[calc(2120px/2.6)]">
            <Image
              src={mode === "dark" ? darkScreen : lightScreen}
              alt="Site dashboard screenshot"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
