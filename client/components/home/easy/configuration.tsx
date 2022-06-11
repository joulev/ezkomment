import { Variants, motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { FC, ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import useTheme from "~/client/hooks/theme";

import createNewPage from "~/public/images/home/create-new-page.svg";
import createNewSite from "~/public/images/home/create-new-site.svg";
import sectionLiveDark from "~/public/images/home/section-live-dark.svg";
import sectionLiveLight from "~/public/images/home/section-live-light.svg";

import ButtonLink from "../buttonLink";

const Illustration: FC<{ children: ReactNode }> = ({ children }) => {
  const animation = useAnimation();
  const [ref, inView] = useInView();
  const variants: Variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    hidden: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };
  useEffect(() => {
    if (inView) {
      animation.start("visible");
    }
  }, [animation, inView]);
  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={animation}>
      {children}
    </motion.div>
  );
};

const EasyConfiguration: FC = () => {
  const theme = useTheme();
  return (
    <section className="container my-24 grid md:grid-cols-2 gap-12">
      <div className="flex flex-col gap-9">
        <h2 className="my-0 font-black text-4xl lg:text-5xl">
          <span className="text-gradient from-red-500 to-orange-500">easy</span> configuration
        </h2>
        <div className="text-muted text-lg md:text-xl lg:text-2xl">
          Zero-configuration. Have a webpage ready?{" "}
          <span className="text-neutral-900 dark:text-neutral-100">
            Adding a fully functional comment section won&apos;t take more than two minutes.
          </span>{" "}
          And no, you don&apos;t have to worry about backend, infrastructure&hellip; ever.
        </div>
        <div>
          <ButtonLink href="/auth" className="from-red-500 to-orange-500">
            Create your first
          </ButtonLink>
        </div>
      </div>
      <div className="flex flex-col gap-12">
        <Illustration>
          <div className="mx-auto" style={{ width: 200 }}>
            <Image
              src={createNewSite}
              alt="Cursor clicking on a 'Create a new site' button"
              layout="responsive"
            />
          </div>
        </Illustration>
        <Illustration>
          <div className="mx-auto" style={{ width: 200 }}>
            <Image
              src={createNewPage}
              alt="Cursor clicking on a 'Create a new page' button"
              layout="responsive"
            />
          </div>
        </Illustration>
        <Illustration>
          <div>
            <Image
              src={theme === "dark" ? sectionLiveDark : sectionLiveLight}
              alt="Banner showing creating comment section is successful"
              layout="responsive"
            />
          </div>
        </Illustration>
      </div>
    </section>
  );
};

export default EasyConfiguration;
