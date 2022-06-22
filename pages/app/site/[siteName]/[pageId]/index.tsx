import clsx from "clsx";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { FC, ReactNode, useState } from "react";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import WebOutlinedIcon from "@mui/icons-material/LanguageOutlined";

import { usePage } from "~/client/hooks/page";

import A from "~/client/components/anchor";
import pagePages from "~/client/components/app/handlePage";
import Banner from "~/client/components/banner";
import Button from "~/client/components/buttons";
import Modal from "~/client/components/modal";
import RightAligned from "~/client/components/utils/rightAligned";

import myPage from "~/sample/page.json";

type Comment = { author: string; date: string; text: string };
type CommentsProps = { comments: Comment[]; children?: ReactNode };
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

const Content: FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [warningDisabled, setWarningDisabled] = useState(false);
  const { page } = usePage();

  function handleDelete() {
    console.log(page);
    if (!warningDisabled) {
      setShowDeleteModal(true);
      setWarningDisabled(true);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-3">{myPage.name}</h1>
      <div className="flex flex-row gap-3 text-muted">
        <WebOutlinedIcon />
        <A
          href={myPage.url}
          notStyled
          className="hover:text-neutral-900 dark:hover:text-neutral-100 transition whitespace-nowrap text-ellipsis overflow-hidden"
        >
          {myPage.url}
        </A>
      </div>
      <hr />
      <Banner variant="warning">
        Beware that if you remove a comment, <strong>that is irreversible</strong> and it will be
        gone forever.
      </Banner>
      <h2>Pending comments</h2>
      {myPage.autoApprove && (
        <p>
          This page has auto-approval turned on, hence all new comments are automatically approved.
        </p>
      )}
      {myPage.pendingApprovalComments.length === 0 ? (
        <p>No pending comments</p>
      ) : (
        <>
          <p>These comments require your approval before appearing in public.</p>
          <Comments comments={myPage.pendingApprovalComments}>
            <div className="flex flex-row gap-3">
              <Button icon={ClearOutlinedIcon} variant="tertiary" onClick={handleDelete} />
              <Button icon={CheckOutlinedIcon} />
            </div>
          </Comments>
        </>
      )}
      <h2>Approved comments</h2>
      {myPage.approvedComments.length === 0 ? (
        <p>No comments</p>
      ) : (
        <>
          <p>
            These comments are now live and visible to all visitors of the myPage. However you can
            still delete any comments you want.
          </p>
          <Comments comments={myPage.approvedComments}>
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
  );
};

const PageOverview = pagePages({
  title: siteName => `Page comments | ${siteName}`,
  activeTab: "all",
  Content,
});

export default PageOverview;
