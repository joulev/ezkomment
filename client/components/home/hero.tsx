import Image from "next/image";
import { FC } from "react";

import useTheme from "~/client/hooks/theme";

import darkScreen from "~/public/images/home/app-dark.png";
import lightScreen from "~/public/images/home/app-light.png";
import logoText from "~/public/images/logo-text.svg";

import Button from "../buttons";

const Hero: FC = () => {
  const mode = useTheme();
  return (
    <div className="overflow-x-hidden mt-24">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="text-center md:text-left flex flex-col gap-12">
          <div>
            <div className="logo-width inline-block">
              <Image src={logoText} alt="logo" layout="responsive" width={397} height={80} />
            </div>
          </div>
          <h1 className="font-black text-5xl md:text-6xl xl:text-7xl !leading-[0.85] my-0">
            Commenting made&nbsp;
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              easy
            </span>
          </h1>
          <div className="text-muted text-xl lg:text-2xl">
            No complicated backend configuration. Add a comment section anywhere &ndash; even if you
            use plain HTML, we got you covered.
          </div>
          <div>
            <Button href="/auth" className="inline-block text-lg lg:text-xl px-9 py-3">
              Get started
            </Button>
          </div>
        </div>
        <div className="hidden md:block relative h-[calc(1612px/2.5)]">
          <div className="absolute left-0 inset-y-0 w-[calc(2212px/2.5)]">
            <Image
              src={mode === "dark" ? darkScreen : lightScreen}
              alt="Site dashboard screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
