import clsx from "clsx";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { GetServerSideProps, NextPage } from "next";
import { FC, ReactNode, useState } from "react";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import WebOutlinedIcon from "@mui/icons-material/LanguageOutlined";

import A from "@client/components/anchor";
import Banner from "@client/components/banner";
import Button from "@client/components/buttons";
import Modal from "@client/components/modal";
import RightAligned from "@client/components/utils/rightAligned";
import AppLayout from "@client/layouts/app";

import page from "@client/sample/page.json";

type Page = typeof page;
type Props = { page: Page };
type Comment = { author: string; date: string; text: string };

const site = { name: "blog-app" };

const Comments: FC<{ comments: Comment[]; children?: ReactNode }> = ({ comments, children }) => (
  <div
    className={clsx(
      "flex flex-col divide-y border rounded bg-card",
      "border-card divide-neutral-300 dark:divide-neutral-700"
    )}
  >
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
        {children && <div className="absolute right-3 top-3 md:right-6 md:top-6">{children}</div>}
      </div>
    ))}
  </div>
);

const PageOverview: NextPage<Props> = ({ page }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [warningDisabled, setWarningDisabled] = useState(false);

  function handleDelete() {
    if (!warningDisabled) {
      setShowDeleteModal(true);
      setWarningDisabled(true);
    }
  }

  return (
    <AppLayout
      title={`Page comments | ${site.name}`}
      type="page"
      activeTab="all"
      siteName={site.name}
      pageId={page.id}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-3">{page.name}</h1>
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
        <Banner variant="warning">
          Beware that if you remove a comment, <strong>that is irreversible</strong> and it will be
          gone forever.
        </Banner>
        <h2>Pending comments</h2>
        {page.autoApprove && (
          <p>
            This page has auto-approval turned on, hence all new comments are automatically
            approved.
          </p>
        )}
        {page.pendingApprovalComments.length === 0 ? (
          <p>No pending comments</p>
        ) : (
          <>
            <p>These comments require your approval before appearing in public.</p>
            <Comments comments={page.pendingApprovalComments}>
              <div className="flex flex-row gap-3">
                <Button icon={ClearOutlinedIcon} variant="tertiary" onClick={handleDelete} />
                <Button icon={CheckOutlinedIcon} />
              </div>
            </Comments>
          </>
        )}
        <h2>Approved comments</h2>
        {page.approvedComments.length === 0 ? (
          <p>No comments</p>
        ) : (
          <>
            <p>
              These comments are now live and visible to all visitors of the page. However you can
              still delete any comments you want.
            </p>
            <Comments comments={page.approvedComments}>
              <Button icon={ClearOutlinedIcon} variant="tertiary" onClick={handleDelete} />
            </Comments>
          </>
        )}
        <Modal isVisible={showDeleteModal} onOutsideClick={() => setShowDeleteModal(false)}>
          <div className="p-6 max-w-lg">
            <p>
              Since deleted comments are irrecoverable, please be cautious when clicking the buttons
              to delete the comments here, whether already approved or not.
            </p>
            <p>This warning will be silenced for the rest of this session.</p>
            <RightAligned>
              <Button onClick={() => setShowDeleteModal(false)}>I understand</Button>
            </RightAligned>
          </div>
        </Modal>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => ({ props: { page } });

export default PageOverview;
