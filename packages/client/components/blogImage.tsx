/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { FC } from "react";

import { BlogImageProps } from "@client/types/components.type";

const BlogImage: FC<BlogImageProps> = ({ src, caption }) => (
  <div className="flex flex-col items-center gap-3 py-3 mb-3">
    <div className="relative rounded overflow-hidden border border-card">
      <img src={src} alt={caption} className="w-full peer" />
      <div
        className={clsx(
          "absolute top-0 h-full w-full transition pointer-events-none",
          "dark:bg-black dark:bg-opacity-30 dark:peer-hover:bg-opacity-0"
        )}
      />
    </div>
    <span className="text-sm print:text-[8pt] text-muted">{caption}</span>
  </div>
);

export default BlogImage;
