import clsx from "clsx";
import { FC } from "react";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

import { ToastProps } from "~/types/client/components.type";

const Toast: FC<ToastProps> = ({ toast, onClose }) => (
  <div
    className={clsx(
      "fixed z-[60] bottom-0 inset-x-0 sm:left-auto mb-6 mx-6 sm:w-full sm:max-w-md p-6 rounded transition-all",
      "flex flex-row gap-3 items-start",
      toast ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      toast && toast.type === "success" && "border bg-card border-card",
      toast && toast.type === "error" && "border bg-red-500 border-red-500 text-white"
    )}
  >
    <div className="flex-1">{toast?.message ?? ""}</div>
    <button onClick={onClose} className="leading-none">
      <ClearOutlinedIcon fontSize="small" />
    </button>
  </div>
);

export default Toast;
