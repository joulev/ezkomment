import { Hash } from "lucide-react";
import A from "~/client13/components/anchor";

import { PostHeadingProps } from "~/types/client/components.type";

export default function PostHeading({ level, id, children }: PostHeadingProps & { level: number }) {
  const HeadingTag: keyof JSX.IntrinsicElements = `h${level as 1 | 2 | 3 | 4 | 5 | 6}`;
  return (
    <HeadingTag id={id} className="flex flex-row items-baseline gap-1.5 group -ml-6">
      {level > 1 && (
        <A href={`#${id}`} className="opacity-0 group-hover:opacity-100 transition">
          <Hash size={18} />
        </A>
      )}
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
    </HeadingTag>
  );
}
