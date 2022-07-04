import clsx from "clsx";
import { FC, useState } from "react";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

import { CopiableCodeProps } from "~/types/client/components.type";

import IconLabel from "./utils/iconAndLabel";

/**
 * Create a input-like pre element that can be copied to the clipboard
 *
 * @note Here we don't use `children`, because to copy something to clipboard, we must use a string.
 * Hence `content` is strongly typed as `string`.
 *
 * @note https://stackoverflow.com/q/24193272
 *
 * @param props.content The content to be copied to the clipboard
 * @param props.className The className (if any) to be applied to *the whole* component
 */
const CopiableCode: FC<CopiableCodeProps> = ({ content, className }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div
      className={clsx(
        "flex flex-row border divide-x rounded transition cursor-pointer text-left group",
        "bg-card border-card divide-card hover:border-muted hover:divide-muted",
        className
      )}
      onClick={() => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }}
    >
      <div className="px-3 py-1.5 flex-1 overflow-x-scroll no-scrollbar">
        <code className="whitespace-nowrap text-sm">{content}</code>
      </div>
      <button
        className={clsx(
          "px-3 py-1.5 shrink-0 transition text-muted",
          "group-hover:text-neutral-700 dark:group-hover:text-neutral-300"
        )}
      >
        <IconLabel
          icon={copied ? CheckOutlinedIcon : ContentCopyOutlinedIcon}
          label={copied ? "Copied" : "Copy"}
          className={clsx(copied && "text-green-500")}
        />
      </button>
    </div>
  );
};

export default CopiableCode;
