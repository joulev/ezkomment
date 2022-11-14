"use client";

import clsx from "clsx";
import JSConfetti from "js-confetti";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Check, X, Globe } from "lucide-react";
import { internalDelete, internalPut } from "~/app/(auth)/internal-fetch";
import { usePage } from "./page-context";
import { useLoadingState } from "~/app/loading-state";
import { useSetToast } from "~/app/(auth)/toast";
import { UNABLE_TO_APPROVE_COMMENT, UNABLE_TO_DELETE_COMMENT } from "~/app/(auth)/errors";
import A from "~/app/components/anchor.client";
import AuthError from "~/app/components/auth-error";
import BlankIllustration from "~/app/components/blank-illustration";
import Button from "~/app/components/buttons.client";
import CopiableCode from "~/app/components/copiable-code.client";
import Modal from "~/app/components/modal.client";
import RightAligned from "~/app/components/utils/right-aligned";
import TimeAgo from "~/app/components/time-ago.client";
import { Comment } from "~/types/server";

const WarningContext = createContext<{
  warningDisabled: boolean;
  setWarningDisabled: (val: boolean) => void;
}>({ warningDisabled: false, setWarningDisabled: () => {} });

function CommentComponent({ comment }: { comment: Comment }) {
  const { setLoading } = useLoadingState();
  const { mutate } = usePage();
  const setToast = useSetToast();
  const { warningDisabled, setWarningDisabled } = useContext(WarningContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { success } = await internalDelete(`/api/comments/${comment.id}`);
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
      const { success } = await internalPut(`/api/comments/${comment.id}`, { status: "Approved" });
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
        <span
          className={clsx(
            "text-muted sm:relative before:hidden sm:before:block",
            "before:absolute before:content-['•'] before:-left-3 before:-translate-x-1/2"
          )}
        >
          <TimeAgo date={comment.date} />
        </span>
      </div>
      {comment.text.length > 0 ? (
        <div dangerouslySetInnerHTML={{ __html: comment.text }} className="post" />
      ) : (
        <div className="text-muted">(no comment body)</div>
      )}
      <div className="absolute right-3 top-3 flex flex-row gap-3">
        <Button icon={X} variant="tertiary" onClick={handleDeleteButton} />
        {comment.status === "Pending" && <Button icon={Check} onClick={handleApprove} />}
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
}

function PendingComments() {
  const { page } = usePage();
  const pathname = usePathname();
  const pendingComments = page.comments.filter(c => c.status === "Pending");

  if (page.autoApprove)
    return (
      <p>
        This page has auto-approval turned on, hence all new comments are automatically approved. Go
        to <A href={`${pathname}/settings`}>settings</A> to configure this.
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
}

function ApprovedComments() {
  const { page } = usePage();
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
}

function useConfetti() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasConfetti = searchParams.get("confetti") !== null;
  const confettiRef = useRef<JSConfetti>();
  useEffect(() => {
    confettiRef.current = new JSConfetti();
  }, []);
  useEffect(() => {
    const confettiColours = ["#6366f1", "#10b981", "#ef4444", "#3b82f6", "#eab308"];
    if (!confettiRef.current) return;
    if (hasConfetti) {
      confettiRef.current.addConfetti({ confettiColors: confettiColours });
      router.push(pathname || "/app/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confettiRef, hasConfetti]);
}

export default function AppPageOverviewPage() {
  const [warningDisabled, setWarningDisabled] = useState(false);
  const { page } = usePage();
  useConfetti();
  return (
    <WarningContext.Provider value={{ warningDisabled, setWarningDisabled }}>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-3">{page.title}</h1>
        <div className="flex flex-row gap-3 text-muted">
          <Globe />
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
}
