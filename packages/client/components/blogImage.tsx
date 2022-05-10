/* eslint-disable @next/next/no-img-element */
import { FC } from "react";

import { BlogImageProps } from "@client/types/components.type";

const BlogImage: FC<BlogImageProps> = ({ src, caption }) => (
  <div className="flex flex-col items-center gap-3 py-3 mb-3">
    <div className="relative rounded overflow-hidden border border-card">
      <img src={src} alt={caption} className="w-full" />
      <div className="absolute top-0 h-full w-full dark:bg-black dark:bg-opacity-30 dark:hover:bg-opacity-0 transition" />
    </div>
    <span className="text-sm text-muted">{caption}</span>
  </div>
);

export default BlogImage;
