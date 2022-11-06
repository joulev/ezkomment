import { Hash } from "lucide-react";
import A from "~/client13/components/anchor";

import { PostHeadingProps } from "~/types/client/components.type";

export default function PostHeading({ level, id, children }: PostHeadingProps & { level: number }) {
  const HeadingTag: keyof JSX.IntrinsicElements = `h${level as 1 | 2 | 3 | 4 | 5 | 6}`;
  return (
    <HeadingTag id={id} className="relative group">
      {typeof children === "string" && children.endsWith(" (updated)") ? (
        <>
          {children.substring(0, children.length - 10)}
          <span className="bg-indigo-500 text-white px-1.5 py-0.5 rounded text-sm font-normal inline-block relative ml-3 bottom-0.5">
            updated
          </span>
        </>
      ) : (
        children
      )}
      {level > 1 && (
        <A
          href={`#${id}`}
          className="absolute bottom-0 right-full pr-1 opacity-0 group-hover:opacity-100 transition"
        >
          <Hash />
        </A>
      )}
    </HeadingTag>
  );
}
