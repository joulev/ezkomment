"use client";

import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Check, X, Trash, CheckCheck } from "lucide-react";
import IconLabel from "~/client13/components/utils/iconAndLabel";
import HomeSection from "../section";

function useAnimateIllustration() {
  const animation = useAnimation();
  const [ref, inView] = useInView({ threshold: 1 });
  const variants = (delay: number) => ({
    hidden: { opacity: 0, transition: { duration: 0.3 } },
    visible: { opacity: 1, transition: { duration: 0.3, delay } },
  });
  const motionProps = (delay: number) => ({
    variants: variants(delay),
    animate: animation,
    initial: "hidden",
  });
  useEffect(() => {
    if (inView) animation.start("visible");
  }, [inView, animation]);
  return { ref, motionProps };
}

function useGreenArrow() {
  const btnRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const handler = () => {
    if (!btnRef.current || !textRef.current || !svgRef.current || !pathRef.current) return;
    const btnRect = btnRef.current.getBoundingClientRect();
    const textRect = textRef.current.getBoundingClientRect();
    const btnSouthY = btnRect.top + btnRect.height;
    const textNorthY = textRect.top;
    const length = textNorthY - btnSouthY - 8;
    svgRef.current.style.height = `${length}px`;
    pathRef.current.setAttribute("d", `M17,${length} L17,4`);
  };
  useEffect(() => {
    handler();
  }, [btnRef, textRef, svgRef, pathRef]);
  useEffect(() => {
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return { btnRef, textRef, svgRef, pathRef };
}

function Illustration() {
  const { ref, motionProps } = useAnimateIllustration();
  const { btnRef, textRef, svgRef, pathRef } = useGreenArrow();
  return (
    <div
      className={clsx(
        "bg-neutral-100 dark:bg-neutral-900 rounded border border-card flex flex-col gap-3",
        "text-sm sm:text-base md:text-sm lg:text-base p-4.5 sm:p-6 md:p-4.5 lg:p-6 relative my-18"
      )}
      ref={ref}
    >
      <div className="flex flex-row gap-6">
        <div className="font-bold">John Doe</div>
        <div className="text-muted">yesterday</div>
      </div>
      <div>
        Incidunt accusamus vero. Ipsam reiciendis unde voluptatibus voluptates ab aliquam aut. Aut
        voluptas laudantium. Voluptatem beatae explicabo et eius. Commodi a autem omnis.
      </div>
      <div
        className={clsx(
          "absolute top-1.5 sm:top-3 md:top-1.5 lg:top-3 right-1.5 sm:right-3 md:right-1.5 lg:right-3",
          "flex flex-row gap-1.5 sm:gap-3 md:gap-1.5 lg:gap-3"
        )}
      >
        <div className="p-1.5 rounded border bg-card border-card h-fit grid place-content-center relative">
          <X />
        </div>
        <div
          className="p-1.5 rounded border bg-indigo-500 border-indigo-500 text-white h-fit grid place-content-center relative"
          ref={btnRef}
        >
          <Check />
        </div>
      </div>
      <svg className="w-full h-full absolute left-0 top-0 -scale-x-100">
        <defs>
          <mask id="buttonMask">
            <rect
              fill="white"
              className="stroke-neutral-300/100 dark:stroke-neutral-700/100"
              height="100%"
              width="100%"
              x="0"
              y="0"
              r="4"
            />
            <rect
              x="0"
              y="0"
              className="w-[86px] h-[46px] sm:w-[104px] sm:h-[58px] md:w-[86px] md:h-[46px] lg:w-[104px] lg:h-[58px]"
              fill="black"
            />
          </mask>
        </defs>
        <motion.rect
          className="w-full h-full fill-white/75 dark:fill-black/75"
          x="0"
          y="0"
          mask="url(#buttonMask)"
          {...motionProps(0.15)}
        />
      </svg>
      <motion.div className="absolute right-0 -top-18 text-red-500" {...motionProps(0.3)}>
        <IconLabel
          icon={Trash}
          label={
            <span className="text-neutral-700 dark:text-neutral-300">
              Remove comments at any time
            </span>
          }
        />
      </motion.div>
      <motion.svg
        className="absolute right-0 -top-11 h-[52px] w-[80px] sm:w-[92px] md:w-[80px] lg:w-[92px] text-red-500"
        {...motionProps(0.3)}
      >
        <defs>
          <marker id="head1" orient="auto" markerWidth="6" markerHeight="6" refX="4" refY="3">
            <path d="M0,0 L0,6 L6,3 Z" className="fill-current" />
          </marker>
        </defs>
        <path markerEnd="url(#head1)" className="stroke-current stroke-2" d="M17,0 L17,48" />
      </motion.svg>
      <motion.div
        className="absolute right-0 -bottom-18 text-emerald-500"
        {...motionProps(0.45)}
        ref={textRef}
      >
        <IconLabel
          icon={CheckCheck}
          label={
            <span className="text-neutral-700 dark:text-neutral-300">
              Approve comments you want to show
            </span>
          }
        />
      </motion.div>
      <motion.svg
        className="absolute right-0 -bottom-11 w-[40px] sm:w-[46px] md:w-[40px] lg:w-[46px] text-emerald-500"
        {...motionProps(0.45)}
        ref={svgRef}
      >
        <defs>
          <marker id="head2" orient="auto" markerWidth="6" markerHeight="6" refX="4" refY="3">
            <path d="M0,0 L0,6 L6,3 Z" className="fill-current" />
          </marker>
        </defs>
        <path
          markerEnd="url(#head2)"
          className="stroke-current stroke-2"
          d="M17,148 L17,4"
          ref={pathRef}
        />
      </motion.svg>
    </div>
  );
}

export default function EasyModeration() {
  return (
    <HomeSection
      colourClass="from-pink-500 to-violet-500"
      title="moderation"
      desc={
        <>
          Spam, hate speech? Unwanted comments? Never a problem.{" "}
          <span className="text-neutral-900 dark:text-neutral-100">
            You have full control over every comment you have, full stop.
          </span>
        </>
      }
      button={{ href: "/docs/moderation/introduction", children: "See how it works" }}
      illustration={{ className: "flex flex-col gap-12", parts: [<Illustration key="1" />] }}
    />
  );
}
