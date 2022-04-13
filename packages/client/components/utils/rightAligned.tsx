import clsx from "clsx";
import { FC, ReactNode } from "react";

const RightAligned: FC<{ className?: string; children: ReactNode }> = ({ className, children }) => (
  <div className={clsx("flex flex-row justify-end", className)}>{children}</div>
);

export default RightAligned;
