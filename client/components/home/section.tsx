import clsx from "clsx";
import { FC } from "react";

import { HomeSectionProps } from "~/types/client/components.type";

import ButtonLink from "./buttonLink";
import Illustration from "./illustration";

const HomeSection: FC<HomeSectionProps> = ({ colourClass, title, desc, button, illustration }) => (
  <section className="container my-24 md:mt-36 md:mb-48 grid md:grid-cols-2 gap-18">
    <div className="flex flex-col gap-9">
      <h2 className="my-0 font-black text-4xl lg:text-5xl">
        <span className={clsx("text-gradient", colourClass)}>easy</span>
        <br className="hidden md:block xl:hidden" /> {title}
      </h2>
      <div className="text-muted text-lg md:text-xl lg:text-2xl">{desc}</div>
      <div>
        <ButtonLink className={colourClass} {...button} />
      </div>
    </div>
    <Illustration {...illustration} />
  </section>
);

export default HomeSection;
