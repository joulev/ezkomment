import clsx from "clsx";
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
import Typed from "typed.js";

import HomeSection from "../section";
import Window from "../window";

const colours = ["#6366f1;", "#10b981;", "#ef4444;", "#3b82f6;", "#eab308;"];

type ActiveContextType = { active: number; setActive: Dispatch<SetStateAction<number>> };
const ActiveContext = createContext<ActiveContextType>({
  active: 0,
  setActive: () => {},
});

const CodeWindow: FC = () => {
  const el = useRef<HTMLElement>(null);
  const typed = useRef<Typed | null>(null);
  const { active, setActive } = useContext(ActiveContext);
  useEffect(() => {
    if (!el.current) return;
    typed.current = new Typed(el.current, {
      strings: colours,
      typeSpeed: 50,
      backSpeed: 50,
      contentType: "null",
      loop: true,
      onStringTyped(arrayPos) {
        setActive(arrayPos);
      },
    });
    return () => typed.current!.destroy();
  }, [el, setActive]);
  return (
    <Window>
      <div className="p-3 text-xs">
        <pre className="overflow-x-hidden max-w-full">
          <code>{`button {\n  background-color: `}</code>
          <span
            className="w-2.5 h-2.5 inline-block border-muted mr-1.5 transition"
            style={{ backgroundColor: colours[active].substring(0, 7) }}
          />
          <code ref={el} />
          <code>{"\n}"}</code>
        </pre>
      </div>
    </Window>
  );
};

const BrowserWindow: FC = () => {
  const cls = "bg-neutral-300 dark:bg-neutral-700 rounded";
  const { active } = useContext(ActiveContext);
  return (
    <Window
      title={
        <div className="rounded bg-card w-36 lg:w-48 py-1 text-center text-xs">localhost:3000</div>
      }
    >
      <div className="grid grid-cols-3 gap-6 p-6">
        <div className={clsx(cls, "h-48")} />
        <div className="col-span-2 flex flex-col gap-3">
          <div className="flex-grow grid grid-rows-3 gap-6">
            <div className="grid grid-rows-3 gap-1.5">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className={cls} />
                ))}
            </div>
            <div className="row-span-2 grid grid-rows-3 gap-1.5">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className={cls} />
                ))}
            </div>
          </div>
          <div>
            <div
              className="ml-auto w-18 h-6 rounded transition"
              style={{ backgroundColor: colours[active].substring(0, 7) }}
            />
          </div>
        </div>
      </div>
    </Window>
  );
};

const EasyCustomisation: FC = () => {
  const [active, setActive] = useState(0);
  return (
    <ActiveContext.Provider value={{ active, setActive }}>
      <HomeSection
        colourClass="from-cyan-500 to-blue-500"
        title="customisation"
        desc={
          <>
            Worried the comment section might not fit your design? Fret not.{" "}
            <span className="text-neutral-900 dark:text-neutral-100">
              Bring your CSS over and make the comment section completely yours.
            </span>
          </>
        }
        button={{ href: "https://google.com", children: "Check it out" }}
        illustration={{
          className: "flex flex-col gap-6",
          parts: [<CodeWindow key="1" />, <BrowserWindow key="2" />],
        }}
      />
    </ActiveContext.Provider>
  );
};

export default EasyCustomisation;
