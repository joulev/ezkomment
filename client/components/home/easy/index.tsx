import { FC } from "react";

import EasyConfiguration from "./configuration";

const EasySections: FC = () => {
  return (
    <div className="border-y border-card bg-card h-[1234px] md:relative overflow-hidden">
      <div className="hidden md:block absolute inset-0">
        <div className="container h-full grid grid-cols-2 gap-12">
          <div />
          <div className="relative">
            <div className="absolute w-1/2 left-0 top-12 bottom-0 border-r border-neutral-200 dark:border-neutral-800" />
            <svg className="absolute left-1/2 top-12 w-2 h-2 -translate-x-[4.5px] -translate-y-1 fill-neutral-200 dark:fill-neutral-800">
              <circle cx="50%" cy="50%" r="50%" />
            </svg>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <EasyConfiguration />
      </div>
    </div>
  );
};

export default EasySections;
