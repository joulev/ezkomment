import clsx from "clsx";
import { FC, ReactNode } from "react";

/**
 * Make the component right-aligned. Intended to use in form buttons.
 *
 * @param props.className Additional classes to be added to the component (if any)
 * @param props.children A React node used as the content of the component
 */
const RightAligned: FC<{ className?: string; children: ReactNode }> = ({ className, children }) => (
  <div className={clsx("flex flex-row justify-end", className)}>{children}</div>
);

export default RightAligned;
