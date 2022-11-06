/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { BlogImageProps } from "~/types/client/components.type";

export default function BlogImage({ src, caption }: BlogImageProps) {
  return (
    <span className="flex flex-col items-center gap-3 py-3 mb-3">
      <span className="relative rounded overflow-hidden border border-card">
        <img src={src} alt={caption} className="w-full peer" />
        <span
          className={clsx(
            "absolute top-0 h-full w-full transition pointer-events-none",
            "dark:bg-black dark:bg-opacity-30 dark:peer-hover:bg-opacity-0 hidden dark:block"
          )}
        />
      </span>
      <span className="text-sm text-muted">{caption}</span>
    </span>
  );
}
