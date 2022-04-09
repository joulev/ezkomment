import { FC } from "react";

const RightAligned: FC = ({ children }) => (
  <div className="flex flex-row justify-end">{children}</div>
);

export default RightAligned;
