import clsx from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import JSConfetti from "js-confetti";
import { useRouter } from "next/router";
import { FC, createContext, useContext, useEffect, useRef, useState } from "react";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import WebOutlinedIcon from "@mui/icons-material/LanguageOutlined";

import useAuth from "~/client/hooks/auth";
import { usePage } from "~/client/hooks/page";
import { useSetToast } from "~/client/hooks/toast";
import { UNABLE_TO_APPROVE_COMMENT, UNABLE_TO_DELETE_COMMENT } from "~/client/lib/errors";
import { internalFetcher } from "~/client/lib/fetcher";

import A from "~/client/components/anchor";
import pagePages from "~/client/components/app/handlePage";
import AuthError from "~/client/components/auth/error";
import BlankIllustration from "~/client/components/blankIllustration";
import Button from "~/client/components/buttons";
import CopiableCode from "~/client/components/copiableCode";
import Modal from "~/client/components/modal";
import RightAligned from "~/client/components/utils/rightAligned";

import { Comment } from "~/types/server";

const Loading: FC = () => (
  <div className="mx-auto max-w-3xl">
    <div className="mb-6 h-9 w-48 pulse" />
    <div className="h-5 pulse" />
    <hr />
    <div className="mb-6 h-12 pulse" />
    <div className="mb-6 h-7 w-48 pulse" />
    <div className="h-5 pulse mb-6" />
    <div className="flex flex-col gap-6">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div className="h-24 pulse" key={i} />
        ))}
    </div>
  </div>
);

const DateToNow: FC<{ date: Date }> = ({ date }) => {
  const formatDate = (date: Date) =>
    new Date().valueOf() - date.valueOf() < 1000 * 60
      ? "A few seconds"
      : formatDistanceToNowStrict(date);
  const [distance, setDistance] = useState(formatDate(date));
  useEffect(() => {
    const interval = setInterval(() => setDistance(formatDate(date)), 15);
    return () => clearInterval(interval);
  }, [date]);
  return <>{distance} ago</>;
};

const WarningContext = createContext<{
  warningDisabled: boolean;
  setWarningDisabled: (val: boolean) => void;
}>({ warningDisabled: false, setWarningDisabled: () => {} });

const CommentComponent: FC<{ comment: Comment }> = ({ comment }) => {
  const { setLoading } = useAuth();
  const { mutate } = usePage();
  const setToast = useSetToast();
  const { warningDisabled, setWarningDisabled } = useContext(WarningContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { success } = await internalFetcher({
        url: `/api/comments/${comment.id}`,
        method: "DELETE",
      });
      if (!success) throw UNABLE_TO_DELETE_COMMENT;
      await mutate();
      setToast({ type: "success", message: "Comment deleted successfully." });
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
    }
    setLoading(false);
  };

  const handleDeleteButton = () => {
    if (!warningDisabled) {
      setWarningDisabled(true);
      setShowDeleteModal(true);
      return;
    }
    handleDelete();
  };

  const handleApprove = async () => {
    setLoading(true);
    try {
      const { success } = await internalFetcher({
        url: `/api/comments/${comment.id}`,
        method: "PUT",
        options: { body: JSON.stringify({ status: "Approved" }) },
      });
      if (!success) throw UNABLE_TO_APPROVE_COMMENT;
      await mutate();
      setToast({ type: "success", message: "Comment approved successfully." });
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
    }
    setLoading(false);
  };

  return (
    <div className="p-6 flex flex-col gap-3 relative">
      <div className="flex flex-col sm:flex-row gap-x-6">
        <strong>{comment.author ?? "Anonymous"}</strong>
        <time
          className={clsx(
            "text-muted sm:relative before:hidden sm:before:block",
            "before:absolute before:content-['•'] before:-left-3 before:-translate-x-1/2"
          )}
          title={new Date(comment.date).toISOString()}
        >
          <DateToNow date={new Date(comment.date)} />
        </time>
      </div>
      {comment.text.length > 0 ? (
        <div dangerouslySetInnerHTML={{ __html: comment.text }} className="post" />
      ) : (
        <div className="text-muted">(no comment body)</div>
      )}
      <div className="absolute right-3 top-3 flex flex-row gap-3">
        <Button icon={ClearOutlinedIcon} variant="tertiary" onClick={handleDeleteButton} />
        {comment.status === "Pending" && (
          <Button icon={CheckOutlinedIcon} onClick={handleApprove} />
        )}
      </div>
      <Modal isVisible={showDeleteModal} onOutsideClick={() => setShowDeleteModal(false)}>
        <div className="p-6 max-w-lg">
          <p>
            Since deleted comments are irrecoverable, please be cautious when clicking the buttons
            to delete the comments here, whether already approved or not.
          </p>
          <p>This warning will be silenced for the rest of this session.</p>
          <RightAligned className="gap-3">
            <Button onClick={() => setShowDeleteModal(false)} variant="tertiary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDelete();
                setShowDeleteModal(false);
              }}
              variant="danger"
            >
              Delete
            </Button>
          </RightAligned>
        </div>
      </Modal>
    </div>
  );
};

const PendingComments: FC = () => {
  const { page } = usePage();
  const router = useRouter();
  if (!page) return null;

  const pendingComments = page.comments.filter(c => c.status === "Pending");

  if (page.autoApprove)
    return (
      <p>
        This page has auto-approval turned on, hence all new comments are automatically approved. Go
        to <A href={`${router.asPath}/settings`}>settings</A> to configure this.
      </p>
    );

  if (pendingComments.length === 0)
    return (
      <div className="flex flex-col gap-6 my-12 items-center">
        <div className="w-48">
          <BlankIllustration />
        </div>
        <div className="text-xl text-center">Nothing here yet. Check again soon.</div>
      </div>
    );

  return (
    <>
      <p>These comments require your approval before appearing in public.</p>
      <div className="flex flex-col divide-y border rounded bg-card border-card divide-card">
        {pendingComments.map((comment, index) => (
          <CommentComponent key={index} comment={comment} />
        ))}
      </div>
    </>
  );
};

const ApprovedComments: FC = () => {
  const { page } = usePage();
  if (!page) return null;

  const approvedComments = page.comments.filter(c => c.status === "Approved");

  if (approvedComments.length === 0)
    return (
      <div className="flex flex-col gap-6 my-12 items-center">
        <div className="w-48">
          <BlankIllustration />
        </div>
        <div className="text-xl text-center">Nothing here yet. Check again soon.</div>
      </div>
    );
  return (
    <>
      <p>
        These comments are now live and visible to all visitors of the page. However you can still
        delete any comments you want. Do note that deleted comments are irrecoverable.
      </p>
      <div className="flex flex-col divide-y border rounded bg-card border-card divide-card">
        {approvedComments.map((comment, index) => (
          <CommentComponent key={index} comment={comment} />
        ))}
      </div>
    </>
  );
};

function useConfetti() {
  const { page } = usePage();
  const { query, pathname, replace } = useRouter();
  const confettiRef = useRef<JSConfetti>();
  useEffect(() => {
    confettiRef.current = new JSConfetti();
  }, []);
  useEffect(() => {
    const confettiColours = ["#6366f1", "#10b981", "#ef4444", "#3b82f6", "#eab308"];
    if (!confettiRef.current || !page) return;
    if (query.confetti === "1") {
      confettiRef.current.addConfetti({ confettiColors: confettiColours });
      delete query.confetti;
      replace({ pathname, query }, undefined, { shallow: true });
    }
  }, [page, query, pathname, replace, confettiRef]);
}

const Content: FC = () => {
  const [warningDisabled, setWarningDisabled] = useState(false);
  const { page } = usePage();
  useConfetti();
  if (!page) return <Loading />;
  return (
    <WarningContext.Provider value={{ warningDisabled, setWarningDisabled }}>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-3">{page.title}</h1>
        <div className="flex flex-row gap-3 text-muted">
          <WebOutlinedIcon />
          <A
            href={page.url}
            notStyled
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition whitespace-nowrap text-ellipsis overflow-hidden"
          >
            {page.url}
          </A>
        </div>
        <hr />
        <section>
          <h2>Your comment section is live!</h2>
          <p>It is available at</p>
          <CopiableCode
            content={`https://ezkomment.joulev.dev/embed/${page.siteId}/${page.id}`}
            className="mb-6"
          />
          <p>
            You can now use it to <A href="/docs/comments/embed">embed to your webpage</A>.
          </p>
        </section>
        <hr />
        <section className="mb-9">
          <h2>Pending comments</h2>
          <PendingComments />
        </section>
        <hr />
        <section>
          <h2>Approved comments</h2>
          <ApprovedComments />
        </section>
      </div>
    </WarningContext.Provider>
  );
};

const PageOverview = pagePages({
  title: siteName => `Page comments | ${siteName}`,
  activeTab: "all",
  Content,
  Loading,
});

export default PageOverview;
