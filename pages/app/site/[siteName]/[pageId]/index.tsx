import clsx from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { FC, ReactNode, useState } from "react";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import WebOutlinedIcon from "@mui/icons-material/LanguageOutlined";

import { usePage } from "~/client/hooks/page";

import A from "~/client/components/anchor";
import pagePages from "~/client/components/app/handlePage";
import Banner from "~/client/components/banner";
import BlankIllustration from "~/client/components/blankIllustration";
import Button from "~/client/components/buttons";
import CopiableCode from "~/client/components/copiableCode";
import Modal from "~/client/components/modal";
import RightAligned from "~/client/components/utils/rightAligned";

import { ClientPage, Comment } from "~/types/server";

type CommentsProps = { comments: Comment[]; children?: ReactNode };

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

const Comments: FC<CommentsProps> = ({ comments, children }) => (
  <div className={clsx("flex flex-col divide-y border rounded bg-card", "border-card divide-card")}>
    {comments.map((comment, index) => (
      <div key={index} className="p-6 flex flex-col gap-3 relative">
        <div className="flex flex-col sm:flex-row gap-x-6">
          <strong>{comment.author ?? "Anonymous"}</strong>
          <time
            className={clsx(
              "text-muted sm:relative before:hidden sm:before:block",
              "before:absolute before:content-['•'] before:-left-3 before:-translate-x-1/2"
            )}
            title={new Date(comment.date).toISOString()}
          >
            {formatDistanceToNowStrict(new Date(comment.date))} ago
          </time>
        </div>
        <div dangerouslySetInnerHTML={{ __html: comment.text }} className="post" />
        {children && <div className="absolute right-3 top-3">{children}</div>}
      </div>
    ))}
  </div>
);

const PendingComments: FC<{ page: ClientPage; handleDelete: () => void }> = ({
  page,
  handleDelete,
}) => {
  const router = useRouter();
  const pendingComments = page.comments.filter(c => c.status === "Pending");
  if (page.autoApprove)
    return (
      <p>
        This page has auto-approval turned on, hence all new comments are automatically approved. Go
        to <A href={`${router.asPath}/settings`}>settings</A> to configure this.
      </p>
    );

  if (pendingComments.length === 0) return <p>There are no pending comments.</p>;

  return (
    <>
      <p>These comments require your approval before appearing in public.</p>
      <Comments comments={pendingComments}>
        <div className="flex flex-row gap-3">
          <Button icon={ClearOutlinedIcon} variant="tertiary" onClick={handleDelete} />
          <Button icon={CheckOutlinedIcon} />
        </div>
      </Comments>
    </>
  );
};

const ApprovedComments: FC<{ page: ClientPage; handleDelete: () => void }> = ({
  page,
  handleDelete,
}) => {
  const approvedComments = page.comments.filter(c => c.status === "Approved");
  if (approvedComments.length === 0)
    return (
      <div className="flex flex-col gap-6 my-12 items-center">
        <div className="w-48">
          <BlankIllustration />
        </div>
        <div className="text-xl text-center">Nothing has arrived yet. Check again soon.</div>
      </div>
    );
  return (
    <>
      <p>
        These comments are now live and visible to all visitors of the page. However you can still
        delete any comments you want.
      </p>
      <Comments comments={approvedComments}>
        <Button icon={ClearOutlinedIcon} variant="tertiary" onClick={handleDelete} />
      </Comments>
    </>
  );
};

const Content: FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [warningDisabled, setWarningDisabled] = useState(false);
  const { page } = usePage();

  function handleDelete() {
    if (!warningDisabled) {
      setShowDeleteModal(true);
      setWarningDisabled(true);
    }
  }

  if (!page) return <Loading />;

  return (
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
          You can now use it to <A href="https://google.com">embed to your webpage</A>.
        </p>
      </section>
      <hr />
      <Banner variant="warning" className="mb-9">
        Beware that if you remove a comment, <strong>that is irreversible</strong> and it will be
        gone forever.
      </Banner>
      <section className="mb-9">
        <h2>Pending comments</h2>
        <PendingComments page={page} handleDelete={handleDelete} />
      </section>
      <hr />
      <section>
        <h2>Approved comments</h2>
        <ApprovedComments page={page} handleDelete={handleDelete} />
      </section>
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
  Loading,
});

export default PageOverview;
