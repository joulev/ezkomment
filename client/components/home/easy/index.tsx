import clsx from "clsx";
import { FC } from "react";

import EasyConfiguration from "./configuration";
import EasyIntegration from "./integration";

const EasySections: FC = () => {
  return (
    <div className="border-y border-card bg-card md:relative overflow-hidden">
      <div className="hidden md:block absolute inset-0">
        <div className="container h-full grid grid-cols-2 gap-18">
          <div />
          <div className="relative">
            <div
              className={clsx(
                "absolute w-px left-1/2 top-24 bottom-0 -translate-x-px bg-gradient-to-b",
                "from-neutral-200 dark:from-neutral-800"
              )}
            />
            <svg className="absolute left-1/2 top-24 w-2 h-2 -translate-x-[4.5px] -translate-y-1 fill-neutral-200 dark:fill-neutral-800">
              <circle cx="50%" cy="50%" r="50%" />
            </svg>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <EasyConfiguration />
        <EasyIntegration />
      </div>
    </div>
  );
};

export default EasySections;
