import clsx from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import { FC } from "react";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

import A from "~/client/components/anchor";

type AppNotification =
  | {
      type: "newComment";
      href?: string;
      siteName: string;
      pageName: string;
      authors: string[];
      timestamp: number;
      haveRead: boolean;
    }
  | {
      type: "other";
      href?: string;
      heading: string;
      content: string;
      timestamp: number;
      haveRead: boolean;
    };

const notifications: AppNotification[] = [
  {
    type: "newComment",
    href: "/app/site/blog/somepageId",
    siteName: "blog",
    pageName: "Hello world",
    authors: ["John Doe", "Anonymous", "Donald"],
    timestamp: new Date("2022-07-08").valueOf(),
    haveRead: false,
  },
  {
    type: "other",
    href: "/docs/getting-started",
    heading: "Welcome to ezkomment!",
    content: "Welcome to ezkomment! Read our Getting started guide to familiarise yourself.",
    timestamp: new Date("2022-07-06").valueOf(),
    haveRead: true,
  },
];

const Notifications: FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => (
  <div
    className={clsx(
      "fixed inset-0 z-50 bg-card bg-opacity-50 dark:bg-opacity-50 transition duration-300",
      show ? "opacity-100" : "opacity-0 pointer-events-none"
    )}
    onClick={onClose}
  >
    <div
      className={clsx(
        "fixed inset-y-0 right-0 w-full sm:max-w-md bg-neutral-100 dark:bg-neutral-900",
        "sm:border-l sm:border-card p-6 transition duration-300 overflow-y-auto no-scrollbar",
        show ? "translate-x-0" : "translate-x-6"
      )}
      onClick={e => e.stopPropagation()}
    >
      <h2>Notifications</h2>
      <p>
        {notifications.filter(n => !n.haveRead).length} unread &mdash; <A>Mark all as read</A>
      </p>
      <div className="flex flex-col gap-6">
        {notifications.map((notif, index) => (
          <A
            notStyled
            key={index}
            className={clsx(
              "bg-card rounded border transition p-6",
              notif.haveRead ? "border-card hover:border-muted" : "border-indigo-500"
            )}
            href={notif.href}
          >
            <h3 className="font-semibold mb-3">
              {notif.type === "other" ? notif.heading : "New comments"}
            </h3>
            <p className={clsx("text-sm mb-3", notif.haveRead && "text-muted")}>
              {notif.type === "other" && <>{notif.content}</>}
              {notif.type === "newComment" && notif.authors.length > 1 && (
                <>
                  <strong>{notif.authors[0]}</strong> and {notif.authors.length - 1} other
                  {notif.authors.length === 2 || "s"} commented in page{" "}
                  <strong>{notif.pageName}</strong> in site <strong>{notif.siteName}</strong>.
                </>
              )}
              {notif.type === "newComment" && notif.authors.length === 1 && (
                <>
                  <strong>{notif.authors[0]}</strong> commented in page{" "}
                  <strong>{notif.pageName}</strong> in site <strong>{notif.siteName}</strong>.
                </>
              )}
            </p>
            <p className="text-sm text-muted mb-0">
              {formatDistanceToNowStrict(new Date(notif.timestamp))} ago
            </p>
          </A>
        ))}
      </div>
      <button
        className="fixed top-6 right-6 text-muted hover:text-neutral-700 dark:hover:text-neutral-300 transition"
        onClick={onClose}
      >
        <ClearOutlinedIcon />
      </button>
    </div>
  </div>
);

export default Notifications;
