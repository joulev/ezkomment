import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { FC } from "react";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";

const DocsBottomBar: FC<{ lastModified: string; path: string[] }> = ({ lastModified, path }) => (
  <>
    <div className="text-center">Was this page helpful?</div>
    <div className="flex flex-row justify-center gap-6 mt-3">
      <Button variant="tertiary" icon={CheckOutlinedIcon}>
        Yes
      </Button>
      <Button variant="tertiary" icon={ClearOutlinedIcon}>
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
export default DocsBottomBar;
