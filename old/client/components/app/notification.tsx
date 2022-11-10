import clsx from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import { FC, MouseEventHandler } from "react";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

import useAuth from "~/old/client/hooks/auth";
import { useSetToast } from "~/old/client/hooks/toast";
import { UNKNOWN_ERROR } from "~/old/client/lib/errors";
import { internalFetcher } from "~/old/client/lib/fetcher";

import A from "~/old/client/components/anchor";
import BlankIllustration from "~/old/client/components/blankIllustration";

const NotificationList: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user, setLoading, notifications, mutateNotifications } = useAuth();
  const setToast = useSetToast();

  if (!user || !notifications) return <>Fetching notifications&hellip;</>;
  if (notifications.length === 0)
    return (
      <div className="flex flex-col gap-6 my-12 items-center">
        <div className="w-48">
          <BlankIllustration />
        </div>
        <div className="text-xl text-center">No new notifications</div>
      </div>
    );

  const handleDismissAll: MouseEventHandler<HTMLButtonElement> = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const { success } = await internalFetcher({
        url: `/api/users/${user.uid}/notifications`,
        method: "DELETE",
      });
      if (!success) throw UNKNOWN_ERROR;
      mutateNotifications([]);
    } catch (err) {
      setToast({
        type: "error",
        message: "Dismiss notifications failed. Please report this to us.",
      });
    }
    setLoading(false);
  };

  const handleDismissById = async (id: string) => {
    onClose();
    await internalFetcher({
      url: `/api/users/${user.uid}/notifications/${id}`,
      method: "DELETE",
    });
    await mutateNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <>
      <p>
        {notifications.length} unread &mdash;{" "}
        <button className="a" onClick={handleDismissAll}>
          Mark all as read
        </button>
      </p>
      <div className="flex flex-col gap-6">
        {notifications.map((notif, index) => (
          <A
            notStyled
            key={index}
            className="bg-card rounded border transition p-6 border-card hover:border-muted"
            onClick={() => handleDismissById(notif.id)}
            href={notif.href}
          >
            <h3 className="font-semibold mb-3">
              {notif.type === "WelcomeMessage" ? "Welcome to ezkomment!" : "New comments"}
            </h3>
            <p className="text-sm mb-3">
              {notif.type === "WelcomeMessage" && (
                <>Welcome to ezkomment! Read our Getting started guide to familiarise yourself.</>
              )}
              {notif.type === "NewComment" && notif.authors.length > 1 && (
                <>
                  <strong>{notif.authors[0]}</strong> and {notif.authors.length - 1} other
                  {notif.authors.length === 2 || "s"} commented in page{" "}
                  <strong>{notif.pageTitle}</strong> in site <strong>{notif.siteName}</strong>.
                </>
              )}
              {notif.type === "NewComment" && notif.authors.length === 1 && (
                <>
                  <strong>{notif.authors[0]}</strong> commented in page{" "}
                  <strong>{notif.pageTitle}</strong> in site <strong>{notif.siteName}</strong>.
                </>
              )}
            </p>
            <p className="text-sm text-muted mb-0">
              {formatDistanceToNowStrict(new Date(notif.timestamp))} ago
            </p>
          </A>
        ))}
      </div>
    </>
  );
};

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
      <NotificationList onClose={onClose} />
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
