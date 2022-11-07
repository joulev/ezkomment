import clsx from "clsx";
import { X } from "lucide-react";

export type Toast = {
  type: "success" | "error";
  message: React.ReactNode;
} | null;
export type Props = {
  toast: Toast;
  onClose: () => void;
};

export default function Toast({ toast, onClose }: Props) {
  return (
    <div
      className={clsx(
        "fixed z-[60] bottom-0 inset-x-0 sm:left-auto mb-6 mx-6 sm:w-full sm:max-w-md p-6 rounded transition-all",
        "flex flex-row gap-3 items-start",
        toast ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none",
        toast && toast.type === "success" && "border bg-card border-card",
        toast && toast.type === "error" && "border bg-red-500 border-red-500 text-white"
      )}
    >
      <div className="flex-1">{toast?.message ?? ""}</div>
      <button onClick={onClose} className="leading-none">
        <X size={18} />
      </button>
    </div>
  );
}
