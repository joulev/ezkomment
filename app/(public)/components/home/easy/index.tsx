import clsx from "clsx";
import EasyConfiguration from "./configuration.client";
import EasyCustomisation from "./customisation.client";
import EasyIntegration from "./integration.client";
import EasyModeration from "./moderation.client";

export default function EasySections() {
  return (
    <div className="border-y border-card bg-card md:relative overflow-hidden">
      <div className="hidden md:block absolute inset-0">
        <div className="container h-full grid grid-cols-2 gap-18">
          <div />
          <div className="relative">
            <div
              className={clsx(
                "absolute w-px left-1/2 top-24 bottom-54 -translate-x-px bg-gradient-to-b",
                "from-neutral-300 dark:from-neutral-700 to-neutral-100 dark:to-neutral-900"
              )}
            />
            <svg className="absolute left-1/2 top-24 w-2 h-2 -translate-x-[4.5px] -translate-y-1 fill-neutral-300 dark:fill-neutral-700">
              <circle cx="50%" cy="50%" r="50%" />
            </svg>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <EasyConfiguration />
        <EasyIntegration />
        <EasyModeration />
        <EasyCustomisation />
      </div>
    </div>
  );
}
