import clsx from "clsx";
import { FC } from "react";

/**
 * A <hr /> element with the word "or" at the middle. Sorry I can't think of a better name for this.
 * @param props.className Additional class names if needed
 */
const OrHr: FC<{ className?: string }> = ({ className }) => (
  <hr
    className={clsx(
      "relative after:absolute after:content-['or'] after:bg-card",
      "after:px-3 after:-translate-y-1/2 after:-translate-x-1/2 after:text-xs after:uppercase",
      "after:text-muted",
      className
    )}
  />
);

export default OrHr;
