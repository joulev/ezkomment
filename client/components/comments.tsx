import clsx from "clsx";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { FC } from "react";

import { CommentsProps } from "~/types/client/components.type";

/**
 * Display comments as in `/app/site/[siteName]/[pageName]/index.tsx`
 *
 * @note This is *not* the default style to display comments in client iframes. It is just here
 * because it is reused in several places.
 *
 * @param props.comments The list of comments. See the type annotation for more information
 * @param props.children This React node will be displayed at the top right of each comment.
 * Intended for controlling buttons (delete, approve, etc.)
 */
const Comments: FC<CommentsProps> = ({ comments, children }) => (
  <div className={clsx("flex flex-col divide-y border rounded bg-card", "border-card divide-card")}>
    {comments.map((comment, index) => (
      <div key={index} className="p-6 flex flex-col gap-3 relative">
        <div className="flex flex-col sm:flex-row gap-x-6">
          <strong>{comment.author}</strong>
          <time
            className={clsx(
              "text-muted sm:relative before:hidden sm:before:block",
              "before:absolute before:content-['•'] before:-left-3 before:-translate-x-1/2"
            )}
            title={comment.date}
          >
            {formatDistanceToNowStrict(parseISO(comment.date))} ago
          </time>
        </div>
        <div>{comment.text}</div>
        {children && <div className="absolute right-3 top-3">{children}</div>}
      </div>
    ))}
  </div>
);

export default Comments;
