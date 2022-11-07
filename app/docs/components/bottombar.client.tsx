"use client";

import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { Check, X } from "lucide-react";
import A from "~/client13/components/anchor.client";
import Button from "~/client13/components/buttons.client";

export type Props = { lastModified: string; path: string[] };

export default function DocsBottomBar({ lastModified, path }: Props) {
  return (
    <>
      <div className="text-center">Was this page helpful?</div>
      <div className="flex flex-row justify-center gap-6 mt-3">
        <Button variant="tertiary" icon={Check}>
          Yes
        </Button>
        <Button variant="tertiary" icon={X}>
          No
        </Button>
      </div>
      <hr />
      <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-baseline gap-y-3 text-sm">
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
