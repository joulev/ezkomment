import clsx from "clsx";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { GetServerSideProps, NextPage } from "next";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

import Banner from "@client/components/banner";
import Button from "@client/components/buttons";
import AppLayout from "@client/layouts/app";

import page from "@client/sample/page.json";

type Page = typeof page;
type Props = { page: Page };

const SiteOverview: NextPage<Props> = ({ page }) => (
  <AppLayout
    title={`Page ${page.id}`}
    type="page"
    activeTab="all"
    siteName="blog-app"
    pageId={page.id}
  >
    <div className="mx-auto max-w-3xl">
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
          <div
            className={clsx(
              "flex flex-col divide-y border rounded bg-white dark:bg-black",
              "border-neutral-300 dark:border-neutral-700 divide-neutral-300 dark:divide-neutral-700"
            )}
          >
            {page.pendingApprovalComments.map((comment, index) => (
              <div key={index} className="p-6 flex flex-col gap-3">
                <div className="flex flex-row gap-3 items-center">
                  <div className="flex-grow">
                    <strong>{comment.author}</strong>
                    <time
                      className={clsx(
                        "ml-6 text-neutral-500 relative before:absolute before:content-['•']",
                        "before:-left-3 before:-translate-x-1/2"
                      )}
                      title={comment.date}
                    >
                      {formatDistanceToNowStrict(parseISO(comment.date))} ago
                    </time>
                  </div>
                  <Button icon={ClearOutlinedIcon} variant="tertiary" />
                  <Button icon={CheckOutlinedIcon} />
                </div>
                <div>{comment.text}</div>
              </div>
            ))}
          </div>
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
          <div
            className={clsx(
              "flex flex-col divide-y border rounded bg-white dark:bg-black",
              "border-neutral-300 dark:border-neutral-700 divide-neutral-300 dark:divide-neutral-700"
            )}
          >
            {page.approvedComments.map((comment, index) => (
              <div key={index} className="p-6 flex flex-col gap-3">
                <div className="flex flex-row gap-3">
                  <div className="flex-grow">
                    <strong>{comment.author}</strong>
                    <time
                      className={clsx(
                        "ml-6 text-neutral-500 relative before:absolute before:content-['•']",
                        "before:-left-3 before:-translate-x-1/2"
                      )}
                      title={comment.date}
                    >
                      {formatDistanceToNowStrict(parseISO(comment.date))} ago
                    </time>
                  </div>
                  <Button icon={ClearOutlinedIcon} variant="tertiary" />
                </div>
                <div>{comment.text}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async () => ({ props: { page } });

export default SiteOverview;
