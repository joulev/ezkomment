import clsx from "clsx";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC, useState } from "react";
import useSWR from "swr";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import WebOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import useAuth from "~/client/hooks/auth";
import useBreakpoint from "~/client/hooks/breakpoint";
import { internalSWRGenerator } from "~/client/lib/fetcher";

import A from "~/client/components/anchor";
import Button from "~/client/components/buttons";
import Input from "~/client/components/forms/input";
import { InputDetachedLabel } from "~/client/components/forms/input";
import Modal from "~/client/components/modal";
// import SiteGraph from "~/client/components/siteGraph";
import RightAligned from "~/client/components/utils/rightAligned";
import AppLayout from "~/client/layouts/app";

import { NextPageWithLayout } from "~/types/client/utils.type";
import { Site } from "~/types/server";

type Props = { siteName: string };
type Param = Props;

const Loading: FC = () => (
  <>
    <div className="flex flex-col md:flex-row justify-between items-start gap-y-6 mb-6">
      <div className="flex flex-row gap-6 items-center">
        <div className="rounded-full w-16 h-16 pulse" />
        <div>
          <div className="mb-2.5 h-8 w-36 pulse" />
          <div className="h-4 w-48 pulse" />
        </div>
      </div>
      <div className="w-full md:w-auto grid grid-cols-2 gap-6">
        <div className="min-w-[144px] h-9 pulse" />
        <div className="min-w-[144px] h-9 pulse" />
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-9">
      <div className="lg:col-span-5">
        <div className="grid grid-cols-3 gap-9">
          <div className="h-14 pulse" />
          <div className="h-14 pulse" />
          <div className="h-14 pulse" />
        </div>
        <div className="w-36 h-7 pulse mt-9 mb-6" />
        <div className="aspect-h-8 aspect-w-12 md:aspect-h-6 lg:aspect-h-8 pulse" />
      </div>
      <div className="lg:col-span-7">
        <div className="w-36 h-7 pulse mb-6" />
        <div className="flex flex-row gap-6 mb-6">
          <div className="h-9 pulse flex-1" />
          <div className="pulse w-36" />
        </div>
        <div className="flex flex-col gap-6">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <div className="h-36 pulse" key={i} />
            ))}
        </div>
      </div>
    </div>
  </>
);

const Stats: FC<{ value: number; label: string; small?: boolean }> = ({ value, label, small }) => (
  <div>
    <div className={clsx("font-light tracking-tighter", small ? "text-3xl" : "text-4xl")}>
      {value}
    </div>
    <div className={clsx("text-muted", small && "text-sm")}>{label}</div>
  </div>
);

const SiteOverviewWithData: FC<{ siteId: string }> = ({ siteId }) => {
  const breakpoint = useBreakpoint();
  const [showNewPageModal, setShowNewPageModal] = useState(false);
  const { data: site } = useSWR(`/api/sites/${siteId}`, internalSWRGenerator<Site | null>(), {
    fallbackData: null,
  });
  if (!site) return <Loading />;
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start gap-y-6 mb-6">
        <div className="flex flex-row gap-6 items-center">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.iconURL ?? "/images/logo.svg"}
              alt=""
              width={64}
              height={64}
              loading="lazy"
            />
          </div>
          <div>
            <div className="mb-1.5 text-3xl">{site.name}</div>
            <div className="flex flex-row gap-3 text-muted">
              <WebOutlinedIcon />
              <A
                href={`https://${site.domain}`}
                notStyled
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition"
              >
                {site.domain}
              </A>
            </div>
          </div>
        </div>
        <div className="w-full md:w-auto grid grid-cols-2 gap-6">
          <Button
            icon={CodeOutlinedIcon}
            variant="tertiary"
            href={`/app/site/${site.id}/customise`}
          >
            Customise
          </Button>
          <Button icon={SettingsOutlinedIcon} href={`/app/site/${site.id}/settings`}>
            Manage
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-9">
        <div className="lg:col-span-5">
          <div className="grid grid-cols-3">
            <Stats label="pages" value={0} />
            <Stats label="comments" value={0} />
            <Stats label="pending" value={0} />
          </div>
          <h2>Last 30 days</h2>
          {/* <SiteGraph {...site.statistics} /> */}
        </div>
        <div className="lg:col-span-7">
          <h2>All pages</h2>
          <div className="flex flex-row gap-6 mb-6">
            <Input
              type="text"
              label={["xs", "sm"].includes(breakpoint) ? null : "Search"}
              icon={SearchOutlinedIcon}
              className="flex-grow"
            />
            <Button
              icon={breakpoint === "xs" ? undefined : AddOutlinedIcon}
              onClick={() => setShowNewPageModal(true)}
            >
              {breakpoint === "xs" ? "New page" : "Add a new page"}
            </Button>
            <Modal isVisible={showNewPageModal} onOutsideClick={() => setShowNewPageModal(false)}>
              <div className="p-6 max-w-lg">
                <h2>Add a new page</h2>
                <p>
                  Please fill in these information as they helps identify this page from other pages
                  in the same site.
                </p>
                <form className="flex flex-col gap-6">
                  <InputDetachedLabel
                    label="Page title"
                    icon={LabelOutlinedIcon}
                    type="text"
                    required
                  />
                  <InputDetachedLabel
                    label="Page URL"
                    icon={WebOutlinedIcon}
                    type="text"
                    required
                  />
                  <RightAligned className="gap-6">
                    <Button
                      variant="tertiary"
                      onClick={() => setShowNewPageModal(false)}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button>Create</Button>
                  </RightAligned>
                </form>
              </div>
            </Modal>
          </div>
          {/* <div className="flex flex-col gap-6">
            {site.pages.map((page, i) => (
              <A
                notStyled
                key={i}
                className="p-6 bg-card border border-card hover:border-muted flex flex-col transition"
                href={`/app/site/${site.name}/${page.id}`}
              >
                <div className="font-semibold text-lg mb-1.5">{page.name}</div>
                <div className="text-muted text-sm mb-6">{page.url}</div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-y-6">
                  <div className="grid grid-cols-2 sm:gap-12">
                    <Stats small label="comments" value={page.commentCount} />
                    <Stats small label="pending" value={page.needsApproval} />
                  </div>
                  <div className="text-sm">
                    Last comment: {formatDistanceToNow(parseISO(page.lastCommentDate))} ago
                  </div>
                </div>
              </A>
            ))}
            </div> */}
        </div>
      </div>
    </>
  );
};

const SiteOverview: NextPageWithLayout<Props> = ({ siteName }) => {
  const { user } = useAuth();
  const { data } = useSWR(
    user ? `/api/users/${user.uid}/sites` : null,
    internalSWRGenerator<Site[] | null>(),
    { fallbackData: null }
  );
  if (!data) return <Loading />;
  const site = data.find(s => s.name === siteName);
  if (!site) return <div>site not found</div>;
  return <SiteOverviewWithData siteId={site.id} />;
};

SiteOverview.getLayout = (page, { siteName }) => (
  <AppLayout
    title={siteName ?? "Loading"}
    type="site"
    activeTab="all"
    siteName={siteName ?? "Loading"}
    loadingScreen={<Loading />}
  >
    {page}
  </AppLayout>
);

export const getStaticPaths: GetStaticPaths<Param> = () => ({ paths: [], fallback: true });
export const getStaticProps: GetStaticProps<Props, Param> = ({ params }) =>
  params && params.siteName ? { props: { siteName: params.siteName } } : { notFound: true };

export default SiteOverview;
