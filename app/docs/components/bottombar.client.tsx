"use client";

import clsx from "clsx";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import A from "~/client13/components/anchor.client";

type Card = { title: string; path: string[] } | undefined;
export type Props = {
  lastModified: string;
  path: string[];
  prev?: Card;
  next?: Card;
};

function PrevNextCard({ card, isLeft }: { card: Card; isLeft?: boolean }) {
  const commonClasses =
    "flex-1 shrink-0 min-w-fit flex gap-1.5 items-center justify-start hover:text-primary transition";
  if (!card) return <div />;
  return (
    <A
      href={`/docs/${card.path.join("/")}`}
      notStyled
      className={clsx(commonClasses, isLeft ? "flex-row" : "flex-row-reverse")}
    >
      {isLeft ? <ArrowLeft /> : <ArrowRight />}
      <div>{card.title}</div>
    </A>
  );
}

export default function DocsBottomBar({ lastModified, path, prev, next }: Props) {
  return (
    <>
      <div className="flex flex-row justify-between flex-wrap gap-x-6 gap-y-3 font-medium">
        <PrevNextCard card={prev} isLeft />
        <PrevNextCard card={next} />
      </div>
      <hr />
      <div className="flex flex-row justify-between flex-wrap gap-x-6 gap-y-3 text-sm">
        <div className="text-muted">
          Last modified:{" "}
          <time title={lastModified}>
            {lastModified === "unknown"
              ? "unknown"
              : formatDistanceToNowStrict(parseISO(lastModified), { addSuffix: true })}
          </time>
        </div>
        <A href={`https://github.com/joulev/ezkomment/blob/main/docs/${path.join("/")}.md`}>
          Edit this page on GitHub
        </A>
      </div>
    </>
  );
}
