"use client";

import { useEffect, useState } from "react";
import A from "~/app/components/anchor.client";
import BlankIllustration from "~/app/components/blankIllustration";

type DocsSearchData = {
  source: string;
  title: string;
  matchCount: number;
  preview: {
    text: string;
    highlight: boolean;
  }[];
}[];

function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-24 pulse" />
      <div className="h-24 pulse" />
      <div className="h-24 pulse" />
      <div className="h-24 pulse" />
      <div className="h-24 pulse" />
      <div className="h-24 pulse" />
      <div className="h-24 pulse" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col gap-6 my-12 items-center">
      <div className="w-48">
        <BlankIllustration />
      </div>
      <div className="text-xl text-center">No results</div>
      <div className="text-muted text-center text-sm">
        Check for spelling errors, since this search bar is not typo-tolerant.
      </div>
    </div>
  );
}

export type Props = { loading: boolean; query: string };

export default function DocsSearchResults({ loading, query }: Props) {
  const [fetching, setFetching] = useState(false);
  const [results, setResults] = useState<DocsSearchData>([]);
  useEffect(() => {
    if (!query) return setResults([]);
    (async () => {
      setFetching(true);
      const res = await fetch(`/api/docs/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.error) setResults([]);
      else setResults(data.data);
      setFetching(false);
    })();
  }, [query]);
  if (loading || fetching) return <Loading />;
  if (results.length === 0) return <EmptyState />;
  return (
    <div className="flex flex-col gap-1.5">
      {results.map(({ source, title, matchCount, preview }) => (
        <A
          notStyled
          key={source}
          href={`/docs/${source}`}
          className="flex flex-col gap-3 rounded lg:hover:bg-neutral-200 dark:lg:hover:bg-neutral-800 transition py-3 lg:px-3"
        >
          <h3 className="font-semibold">{title}</h3>
          <div className="text-sm">
            {preview.map(({ text, highlight }, index) => (
              <span key={index} className={highlight ? "text-primary" : "text-muted"}>
                {text}
              </span>
            ))}
            <span>&nbsp;({matchCount})</span>
          </div>
        </A>
      ))}
    </div>
  );
}
