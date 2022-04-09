import clsx from "clsx";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { GetServerSideProps, NextPage } from "next";
import { FC } from "react";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import WebOutlinedIcon from "@mui/icons-material/LanguageOutlined";

import A from "@client/components/anchor";
import Banner from "@client/components/banner";
import Button from "@client/components/buttons";
import AppLayout from "@client/layouts/app";

import page from "@client/sample/page.json";

type Page = typeof page;
type Props = { page: Page };
type Comment = { author: string; date: string; text: string };

const Comments: FC<{ comments: Comment[] }> = ({ comments, children }) => (
  <div
    className={clsx(
      "flex flex-col divide-y border rounded bg-white dark:bg-black",
      "border-neutral-300 dark:border-neutral-700 divide-neutral-300 dark:divide-neutral-700"
    )}
  >
    {comments.map((comment, index) => (
      <div key={index} className="p-6 flex flex-col gap-3 relative">
        <div className="flex flex-col sm:flex-row gap-x-6">
          <strong>{comment.author}</strong>
          <time
            className={clsx(
              "text-neutral-500 sm:relative before:hidden sm:before:block",
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

const SiteOverview: NextPage<Props> = ({ page }) => (
  <AppLayout
    title={`Page ${page.id}`}
    type="page"
    activeTab="all"
    siteName="blog-app"
    pageId={page.id}
  >
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-3">{page.name}</h1>
      <div className="flex flex-row gap-3 text-neutral-500">
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
          This page has auto-approval turned on, hence all new comments are automatically approved.
        </p>
      )}
      {page.pendingApprovalComments.length === 0 ? (
        <p>No pending comments</p>
      ) : (
        <>
          <p>These comments require your approval before appearing in public.</p>
          <Comments comments={page.pendingApprovalComments}>
            <div className="flex flex-row gap-3">
              <Button icon={ClearOutlinedIcon} variant="tertiary" />
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
            <Button icon={ClearOutlinedIcon} variant="tertiary" />
          </Comments>
        </>
      )}
    </div>
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async () => ({ props: { page } });

export default SiteOverview;
