import { FC, ReactNode } from "react";

const RightAligned: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex flex-row justify-end">{children}</div>
);

export default RightAligned;
