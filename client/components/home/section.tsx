import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { HomeSectionProps } from "~/types/client/components.type";

import ButtonLink from "./buttonLink";
import Illustration from "./illustration";

const HomeSection: FC<HomeSectionProps> = ({ title, desc, button, illustration }) => {
  const animation = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) animation.start("visible");
  }, [animation, inView]);
  return (
    <section className="container my-24 grid md:grid-cols-2 gap-18">
      <div className="flex flex-col gap-9">
        <h2 className="my-0 font-black text-4xl lg:text-5xl">
          <span className={clsx("text-gradient", title.className)}>easy</span> {title.children}
        </h2>
        <motion.div
          ref={ref}
          className="text-muted text-lg md:text-xl lg:text-2xl"
          variants={{
            visible: { opacity: 1, transition: { duration: 0.15 } },
            hidden: { opacity: 0, transition: { duration: 0.15 } },
          }}
          initial="hidden"
          animate={animation}
        >
          {desc}
        </motion.div>
        <div>
          <ButtonLink {...button} />
        </div>
      </div>
      <Illustration {...illustration} />
    </section>
  );
};

export default HomeSection;
