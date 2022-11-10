/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { FC } from "react";

import { BlogImageProps } from "~/old/types/client/components.type";

const BlogImage: FC<BlogImageProps> = ({ src, caption }) => (
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

export default BlogImage;
