"use client";

import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Button from "~/client13/components/buttons.client";
import BeyondTheBoundary from "./beyond";
import OpenSource from "./open";
import styles from "./spaceship.module.css";

export default function FinalSections() {
  const animation = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5 });
  useEffect(() => {
    if (inView) animation.start("visible");
  }, [inView, animation]);
  return (
    <div className={styles.stars}>
      <div className="container flex flex-row flex-wrap gap-x-6 sm:gap-x-24">
        <div className="relative md:px-12">
          <motion.div
            animate={animation}
            initial="hidden"
            variants={{
              visible: { marginTop: 192, transition: { duration: 0.6, ease: "easeOut" } },
              hidden: { marginTop: 500 },
            }}
          >
            <svg
              width={93 / 1.5}
              height={184 / 1.5}
              viewBox="0 0 93 184"
              className="stroke-neutral-500"
              strokeWidth={1.5}
              fill="none"
            >
              <path d="M36.5382 151.077H56.5381M36.5382 151.077C36.5382 151.077 36.5382 152.077 11.5382 181.077C-3.46151 112.077 -3.46152 81.0771 26.0872 112.577M36.5382 151.077C36.5382 151.077 31.1465 134.605 26.0872 112.577M56.5381 151.077C56.5381 151.077 61.9298 134.605 66.9891 112.577M56.5381 151.077L81.5382 181.077C96.5385 112.077 96.5385 81.0771 66.9891 112.577M26.0872 112.577C15.8795 68.1338 7.025 1.07715 46.5381 1.07715C86.0512 1.07715 77.1968 68.1338 66.9891 112.577M46.5381 112.577V180.077M46.5381 31.0771C40.5385 31.0771 36.5382 35.0771 36.5382 41.0771C36.5382 47.0771 40.5378 51.0771 46.5381 51.0771C52.5385 51.0771 56.5381 47.0771 56.5381 41.0771C56.5381 35.0771 52.5378 31.0771 46.5381 31.0771Z" />
            </svg>
          </motion.div>
          <motion.div
            className={clsx("absolute left-1/2 bottom-0 w-6 -translate-x-3", styles.smoke)}
            animate={animation}
            initial="hidden"
            variants={{
              visible: { top: 342, transition: { duration: 0.6, ease: "easeOut" } },
              hidden: { top: 650 },
            }}
          />
        </div>
        <div className="flex-1" ref={ref}>
          <BeyondTheBoundary />
          <OpenSource />
        </div>
        <div className="w-full rounded border bg-card border-card p-9 lg:p-12 flex flex-col lg:flex-row lg:items-center gap-6 mb-18">
          <h2 className="flex-grow my-0 text-2xl lg:text-3xl text-center lg:text-left">
            Get started, for completely&nbsp;free!
          </h2>
          <div className="grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 lg:grid-rows-2 lg:grid-cols-1 gap-3 md:gap-6 lg:text-xl">
            <Button href="/new/auth">Get started</Button>
            <Button href="/new/docs" variant="tertiary" className="lg:px-12">
              Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
