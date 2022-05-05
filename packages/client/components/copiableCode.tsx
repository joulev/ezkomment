import clsx from "clsx";
import { FC, useState } from "react";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

import { CopiableCodeProps } from "@client/types/components.type";

import IconLabel from "./utils/iconAndLabel";

/**
 * Create a input-like pre element that can be copied to the clipboard
 *
 * @note Here we don't use `children`, because to copy something to clipboard, we must use a string.
 * Hence `content` is strongly typed as `string`.
 *
 * @note Currently the scrolling effect is not working on mobile (at least Safari), so do take
 * care when using this component with a long `content` string. TODO: Implement a workaround.
 * C'mon Safari you're really becoming the second Internet Explorer?
 *
 * @note https://stackoverflow.com/q/24193272
 *
 * @param props.content The content to be copied to the clipboard
 * @param props.className The className (if any) to be applied to *the whole* component
 */
const CopiableCode: FC<CopiableCodeProps> = ({ content, className }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={clsx(
        "flex flex-row border divide-x rounded transition cursor-pointer w-full text-left group",
        "bg-card border-card",
        "divide-card",
        "hover:border-neutral-700 dark:hover:border-neutral-300",
        "hover:divide-neutral-700 dark:hover:divide-neutral-300",
        className
      )}
      onClick={() => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }}
    >
      <div className="px-3 py-1.5 flex-grow transition overflow-x-scroll no-scrollbar">
        <code className="whitespace-nowrap">{content}</code>
      </div>
      <div
        className={clsx(
          "px-3 py-1.5 shrink-0 transition text-muted",
          "group-hover:text-neutral-900 dark:group-hover:text-neutral-100"
        )}
      >
        <IconLabel
          icon={copied ? CheckOutlinedIcon : ContentCopyOutlinedIcon}
          label={copied ? "Copied" : "Copy"}
          className={clsx(copied && "text-green-500")}
        />
      </div>
    </button>
  );
};

export default CopiableCode;
