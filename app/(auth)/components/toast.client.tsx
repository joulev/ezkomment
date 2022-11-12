"use client";
import clsx from "clsx";
import { X } from "lucide-react";
import { Toast as ToastType } from "../toast";

export type Props = {
  toast: ToastType;
  onClose: () => void;
};

export default function Toast({ toast, onClose }: Props) {
  return (
    <div
      className={clsx(
        "fixed z-[60] bottom-0 inset-x-0 sm:left-auto mb-6 mx-6 sm:w-full sm:max-w-md p-6 rounded",
        "flex flex-row gap-3 items-start transition-all duration-300",
        toast ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none",
        toast && toast.type === "success" && "border bg-card border-card",
        toast && toast.type === "error" && "border bg-red-500 border-red-500 text-white"
      )}
    >
      <div className="flex-1">{toast?.message ?? ""}</div>
      <button onClick={onClose} className="leading-none">
        <X />
      </button>
    </div>
  );
}
