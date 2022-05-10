/* eslint-disable @next/next/no-img-element */
import { FC } from "react";

import { BlogImageProps } from "@client/types/components.type";

const BlogImage: FC<BlogImageProps> = ({ src, alt }) => (
  <div className="flex flex-col items-center gap-3 py-3">
    <div className="relative rounded overflow-hidden border border-card">
      <img src={src} alt={alt} className="w-full" />
      <div className="absolute top-0 h-full w-full dark:bg-black dark:bg-opacity-30 dark:hover:bg-opacity-0 transition" />
    </div>
    <span className="text-sm text-muted">{alt ?? "This image has no caption."}</span>
  </div>
);

export default BlogImage;
