import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { HomeIllustrationProps } from "~/old/types/client/components.type";

const Illustration: FC<HomeIllustrationProps> = ({ firstOrLast, parts, className, ...rest }) => {
  const animation = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5 });
  useEffect(() => {
    if (inView) animation.start("visible");
  }, [animation, inView]);
  const variants = (delay: number) => ({
    visible: { opacity: 1, x: 0, transition: { duration: 0.15, delay } },
    hidden: { opacity: 0, x: 50, transition: { duration: 0.15, delay } },
  });
  return (
    <div
      ref={ref}
      className={clsx(
        className,
        "pointer-events-none relative",
        firstOrLast === "last" ? "pt-12 md:pt-0" : "py-12 md:py-0"
      )}
      {...rest}
    >
      <div
        className={clsx(
          "md:hidden absolute w-px left-1/2 top-0 bottom-0 -translate-x-px bg-gradient-to-b",
          firstOrLast === "first" &&
            "from-neutral-300 dark:from-neutral-700 to-neutral-100 dark:to-neutral-900",
          firstOrLast === "last" &&
            "from-neutral-100 dark:from-neutral-900 to-neutral-300 dark:to-neutral-700",
          firstOrLast ||
            "from-neutral-100 dark:from-neutral-900 via-neutral-300 dark:via-neutral-700 to-neutral-100 dark:to-neutral-900"
        )}
      />
      {firstOrLast === "first" && (
        <svg className="md:hidden absolute left-1/2 top-0 w-2 h-2 -translate-x-[4.5px] -translate-y-1 fill-neutral-300 dark:fill-neutral-700">
          <circle cx="50%" cy="50%" r="50%" />
        </svg>
      )}
      {parts.map((part, i) => (
        <motion.div variants={variants(i * 0.15)} initial="hidden" animate={animation} key={i}>
          {part}
        </motion.div>
      ))}
    </div>
  );
};

export default Illustration;
