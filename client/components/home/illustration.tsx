import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { HomeIllustrationProps } from "~/types/client/components.type";

const Illustration: FC<HomeIllustrationProps> = ({ parts, className, ...rest }) => {
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
      className={clsx(className, "pointer-events-none relative pt-12 md:pt-0")}
      {...rest}
    >
      <div
        className={clsx(
          "md:hidden absolute w-px left-1/2 top-0 bottom-0 -translate-x-px bg-gradient-to-b",
          "from-neutral-200 dark:from-neutral-800"
        )}
      />
      <svg className="md:hidden absolute left-1/2 top-0 w-2 h-2 -translate-x-[4.5px] -translate-y-1 fill-neutral-200 dark:fill-neutral-800">
        <circle cx="50%" cy="50%" r="50%" />
      </svg>
      {parts.map((part, i) => (
        <motion.div variants={variants(i * 0.15)} initial="hidden" animate={animation} key={i}>
          {part}
        </motion.div>
      ))}
    </div>
  );
};

export default Illustration;
