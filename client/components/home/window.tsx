import clsx from "clsx";
import { FC } from "react";

import { WindowProps } from "~/types/components.type";

const MacOSWindowButton: FC = () => (
  <div className="border-r border-b border-card h-12 px-4.5 flex flex-row items-center shrink-0">
    <svg width={52} height={12}>
      {[0, 1, 2].map(i => (
        <circle
          key={i}
          cx={6 + 20 * i}
          cy={6}
          r={6}
          className="fill-neutral-300 dark:fill-neutral-700"
        />
      ))}
    </svg>
  </div>
);

const WindowTab: FC<{ title: string; active?: boolean }> = ({ title, active }) => (
  <div
    className={clsx(
      "w-36 border-r border-card pl-4.5 text-sm flex flex-row items-center shrink-0 relative",
      active ? "font-semibold" : "border-b text-muted",
      "after:absolute after:content-['×'] after:right-3 after:top-1/2 after:-translate-y-1/2",
      "after:text-xl after:font-extralight"
    )}
  >
    {title}
  </div>
);

/**
 * Display a macOS-style window with tabs. Used in home page illustrations.
 *
 * @param props.tabs An array of strings used as the titles of the tabs
 * @param props.activeTab The index of the tab to be active
 * @param props.children A React node used as the content of the window
 */
const Window: FC<WindowProps> = ({ tabs, activeTab, children }) => (
  <div className="flex flex-col border rounded bg-card border-card">
    <div className="overflow-x-hidden">
      <div className="flex flex-row min-w-full">
        <MacOSWindowButton />
        {tabs.map((title, i) => (
          <WindowTab key={i} title={title} active={i === activeTab} />
        ))}
        <div className="flex-grow border-b border-card" />
      </div>
    </div>
    {children}
  </div>
);

export default Window;
