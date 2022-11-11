import { Hash } from "lucide-react";
import A from "~/app/components/anchor.client";

export type Props = React.PropsWithChildren<{
  level: number;
  id?: string;
}>;

function HandleUpdated({ children }: React.PropsWithChildren) {
  if (typeof children !== "string" || !children.endsWith(" (updated)")) return <>{children}</>;
  const main = children.substring(0, children.length - 10);
  return (
    <>
      {main}
      <span className="bg-indigo-500 text-white px-1.5 py-0.5 rounded text-sm font-normal inline-block relative ml-3 bottom-0.5">
        updated
      </span>
    </>
  );
}

function H1({ children }: React.PropsWithChildren) {
  return (
    <h1>
      <HandleUpdated>{children}</HandleUpdated>
    </h1>
  );
}

function Higher({ level, id, children }: Props) {
  const HeadingTag: keyof JSX.IntrinsicElements = `h${level as 2 | 3 | 4 | 5 | 6}`;
  return (
    <HeadingTag id={id} className="flex flex-row items-baseline gap-1.5 group -ml-6">
      <A href={`#${id}`} className="opacity-0 group-hover:opacity-100 transition">
        <Hash size={18} />
      </A>
      <HandleUpdated>{children}</HandleUpdated>
    </HeadingTag>
  );
}

export default function PostHeading(props: Props) {
  if (props.level === 1) return <H1 {...props} />;
  return <Higher {...props} />;
}
