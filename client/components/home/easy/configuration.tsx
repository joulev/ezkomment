import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { ComponentProps, FC, ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import useTheme from "~/client/hooks/theme";

import createNewPage from "~/public/images/home/create-new-page.svg";
import createNewSite from "~/public/images/home/create-new-site.svg";
import sectionLiveDark from "~/public/images/home/section-live-dark.svg";
import sectionLiveLight from "~/public/images/home/section-live-light.svg";

import ButtonLink from "../buttonLink";

const Illustration: FC<{ parts: ReactNode[] } & ComponentProps<"div">> = ({
  parts,
  className,
  ...rest
}) => {
  const animation = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5 });
  useEffect(() => {
    if (inView) animation.start("visible");
  }, [animation, inView]);
  return (
    <div ref={ref} className={clsx(className, "pointer-events-none relative pt-12")} {...rest}>
      <div
        className={clsx(
          "md:hidden absolute w-px left-1/2 top-0 bottom-0 -translate-x-px bg-gradient-to-b",
          "from-neutral-200 dark:from-neutral-800"
        )}
      />
      <svg className="md:hidden absolute left-1/2 top-0 w-2 h-2 -translate-x-[4.5px] -translate-y-1 fill-neutral-200 dark:fill-neutral-800">
        <circle cx="50%" cy="50%" r="50%" />
      </svg>
      {parts.map((part, index) => (
        <motion.div
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.15, ease: "easeInOut", delay: index * 0.15 },
            },
            hidden: {
              opacity: 0,
              x: 50,
              transition: { duration: 0.15, ease: "easeInOut", delay: index * 0.15 },
            },
          }}
          initial="hidden"
          animate={animation}
          key={index}
        >
          {part}
        </motion.div>
      ))}
    </div>
  );
};

const EasyConfiguration: FC = () => {
  const theme = useTheme();
  const animation = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) animation.start("visible");
  }, [animation, inView]);
  return (
    <section className="container my-24 grid md:grid-cols-2 gap-18">
      <div className="flex flex-col gap-9">
        <h2 className="my-0 font-black text-4xl lg:text-5xl">
          <span className="text-gradient from-red-500 to-orange-500">easy</span> configuration
        </h2>
        <motion.div
          ref={ref}
          className="text-muted text-lg md:text-xl lg:text-2xl"
          variants={{
            visible: { opacity: 1, transition: { duration: 0.15, ease: "easeInOut" } },
            hidden: { opacity: 0, transition: { duration: 0.15, ease: "easeInOut" } },
          }}
          initial="hidden"
          animate={animation}
        >
          Zero-configuration. Have a webpage ready?{" "}
          <span className="text-neutral-900 dark:text-neutral-100">
            Adding a fully functional comment section won&apos;t take more than two minutes.
          </span>{" "}
          And no, you don&apos;t have to worry about backend, infrastructure&hellip; ever.
        </motion.div>
        <div>
          <ButtonLink href="/auth" className="from-red-500 to-orange-500">
            Create your first
          </ButtonLink>
        </div>
      </div>
      <Illustration
        className="flex flex-col gap-12"
        parts={[
          <div
            className="mx-auto"
            style={{ width: `${(234 * 100) / 645}%`, minWidth: 234 / 1.5 }}
            key="1"
          >
            <Image
              src={createNewSite}
              alt="Cursor clicking on a 'Create a new site' button"
              layout="responsive"
            />
          </div>,
          <div
            className="mx-auto"
            style={{ width: `${(243 * 100) / 645}%`, minWidth: 243 / 1.5 }}
            key="2"
          >
            <Image
              src={createNewPage}
              alt="Cursor clicking on a 'Create a new page' button"
              layout="responsive"
            />
          </div>,
          <div key="3">
            <Image
              src={theme === "dark" ? sectionLiveDark : sectionLiveLight}
              alt="Banner showing creating comment section is successful"
              layout="responsive"
            />
          </div>,
        ]}
      />
    </section>
  );
};

export default EasyConfiguration;
