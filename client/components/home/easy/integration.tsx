import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";
import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";
import Typed from "typed.js";

import HomeSection from "../section";
import Window from "../window";

type IsVisibleContextType = { isVisible: boolean; setIsVisible: Dispatch<SetStateAction<boolean>> };
const IsVisibleContext = createContext<IsVisibleContextType>({
  isVisible: false,
  setIsVisible: () => {},
});

const CodeWindow: FC = () => {
  const el = useRef<HTMLElement>(null);
  const typed = useRef<Typed | null>(null);
  const [ref, inView] = useInView({ threshold: 1 });
  const { setIsVisible } = useContext(IsVisibleContext);
  const str = '&lt;iframe src="https://ezkomment.joulev.dev/embed/..."&gt;';
  useEffect(() => {
    if (!el.current) return;
    if (!inView) {
      setIsVisible(false);
      return;
    }
    typed.current = new Typed(el.current, { strings: [str], typeSpeed: 600 / str.length });
    setIsVisible(true);
    return () => typed.current!.destroy();
  }, [el, inView, setIsVisible]);
  return (
    <Window title="index.html">
      <div className="p-3 text-xs" ref={ref}>
        <pre className="overflow-x-hidden max-w-full">
          <code>{`<section>\n  <h2>Comments</h2>\n  `}</code>
          <code ref={el} />
          <code>{"\n</section>"}</code>
        </pre>
      </div>
    </Window>
  );
};

const BrowserWindow: FC = () => {
  const cls = "bg-neutral-300 dark:bg-neutral-700 rounded";
  const animation = useAnimation();
  const { isVisible } = useContext(IsVisibleContext);
  useEffect(() => {
    if (isVisible) animation.start("visible");
    else animation.start("hidden");
  }, [animation, isVisible]);
  return (
    <Window
      title={
        <div className="rounded bg-card w-36 lg:w-48 py-1 text-center text-xs">localhost:3000</div>
      }
    >
      <div className="grid grid-cols-3 gap-6 p-6">
        <div className={clsx(cls, "h-48")} />
        <div className="col-span-2 grid grid-rows-3 gap-6">
          <div className="grid grid-rows-4 gap-1.5">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className={cls} />
              ))}
          </div>
          <motion.div
            className="row-span-2 grid grid-rows-3 gap-1.5"
            variants={{
              hidden: { opacity: 0, transition: { duration: 0.15, delay: 0.3 } },
              visible: { opacity: 1, transition: { duration: 0.15, delay: 1 } },
            }}
            initial="hidden"
            animate={animation}
          >
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className={cls} />
              ))}
          </motion.div>
        </div>
      </div>
    </Window>
  );
};

const EasyIntegration: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <IsVisibleContext.Provider value={{ isVisible, setIsVisible }}>
      <HomeSection
        colourClass="from-yellow-600 to-lime-600"
        title="integration"
        desc={
          <>
            All you need to do then is to add the embedding HTML <code>{"<iframe>"}</code> tag to
            your webpage.{" "}
            <span className="text-neutral-900 dark:text-neutral-100">
              No need of complicated frameworks, good ol’ plain HTML can do!
            </span>
          </>
        }
        button={{ href: "/auth", children: "Embed now" }}
        illustration={{
          className: "flex flex-col gap-6",
          parts: [<CodeWindow key="1" />, <BrowserWindow key="2" />],
        }}
      />
    </IsVisibleContext.Provider>
  );
};

export default EasyIntegration;
