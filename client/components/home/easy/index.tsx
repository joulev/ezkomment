import { FC } from "react";

import EasyConfiguration from "./configuration";

const EasySections: FC = () => {
  return (
    <div className="border-y border-card bg-card h-[1234px] md:relative">
      <div className="hidden md:grid absolute inset-0 grid-cols-2 gap-6">
        <div />
        <div className="relative">
          <div className="absolute w-1/2 left-0 top-12 bottom-0 border-r border-neutral-200 dark:border-neutral-800" />
          <svg className="absolute left-1/2 top-12 w-2 h-2 -translate-x-[4.5px] -translate-y-1 fill-neutral-200 dark:fill-neutral-800">
            <circle cx="50%" cy="50%" r="50%" />
          </svg>
        </div>
      </div>
      <EasyConfiguration />
    </div>
  );
};

export default EasySections;
