import clsx from "clsx";
import { FC, useState } from "react";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";

import useAuth from "~/client/hooks/auth";
import useBreakpoint from "~/client/hooks/breakpoint";

import A from "~/client/components/anchor";
import BlankIllustration from "~/client/components/blankIllustration";
import Button from "~/client/components/buttons";
import Input from "~/client/components/forms/input";
import Select from "~/client/components/forms/select";
import AppLayout from "~/client/layouts/app";

import { Breakpoint, NextPageWithLayout } from "~/types/client/utils.type";
import { ClientUser } from "~/types/server";

type Site = ClientUser["sites"][number];

const Loading: FC = () => (
  <>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="col-span-2 h-9 pulse" />
      <div className="col-span-1 h-9 pulse" />
      <div className="col-span-1 h-9 pulse" />
    </div>
    <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(16)].map((_, i) => (
        <SiteCard key={i} />
      ))}
    </main>
  </>
);

const EmptyState: FC<{ bySearch?: boolean }> = ({ bySearch }) => (
  <div className="flex flex-col md:flex-row items-center md:justify-center my-12 md:my-18 gap-12 md:gap-18">
    <div className="flex-shrink-0 w-[calc(286px/1.5)] sm:w-[256px]">
      <BlankIllustration />
    </div>
    <div className="flex flex-col gap-9 justify-center">
      <div className="text-2xl sm:text-4xl text-center md:text-left">
        {bySearch ? "No sites found" : <>Add a new site to get&nbsp;started</>}
      </div>
      <div className="text-center md:text-left">
        <Button href="/app/new" className="inline-block" icon={AddOutlinedIcon}>
          Add a new site
        </Button>
      </div>
    </div>
  </div>
);

const Stats: FC<{ value: number; label: string }> = ({ value, label }) => (
  <div>
    <div className="text-3xl font-light">{value}</div>
    <div className="text-muted text-xs uppercase tracking-widest">{label}</div>
  </div>
);

const SiteCard: FC<{ site?: Site }> = ({ site }) => (
  <A
    notStyled
    className="cursor-pointer p-6 transition bg-card rounded border border-card hover:border-muted"
    href={site ? `/app/site/${site.name}` : undefined}
  >
    {site ? (
      <>
        <div className="flex flex-row gap-6 items-center mb-6">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.iconURL ?? "/images/logo.svg"}
              alt=""
              width={48}
              height={48}
              loading="lazy"
            />
          </div>
          <div>
            <div className="text-xl font-semibold truncate mb-1">{site.name}</div>
            <div className="text-sm text-muted truncate">
              {site.domain === "*" ? "All domains" : site.domain}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Stats label="pages" value={site.pageCount} />
          <Stats label="comments" value={site.totalCommentCount} />
          <Stats label="pending" value={site.pendingCommentCount} />
        </div>
      </>
    ) : (
      <>
        <div className="flex flex-row gap-6 mb-6">
          <div>
            <div className="w-12 h-12 rounded-full pulse" />
          </div>
          <div>
            <div className="h-6 w-36 pulse mb-1" />
            <div className="h-4 w-32 pulse" />
          </div>
        </div>
        <div className="h-7 pulse mb-3" />
        <div className="h-4 pulse" />
      </>
    )}
  </A>
);

const EmptyCard: FC = () => (
  <A
    href="/app/new"
    notStyled
    className={clsx(
      "rounded border border-dashed border-card grid place-items-center transition cursor-pointer",
      "text-neutral-300 dark:text-neutral-700 hover:text-muted"
    )}
  >
    <div className="flex flex-col items-center gap-3">
      <svg width={36} height={36}>
        <line x1="18" y1="0" x2="18" y2="36" className="stroke-current stroke-[4px] transition" />
        <line x1="0" y1="18" x2="36" y2="18" className="stroke-current stroke-[4px] transition" />
      </svg>
      <span>Add new site</span>
    </div>
  </A>
);

function showEmptyCard(breakpoint: Breakpoint, siteCount: number) {
  // grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  if (breakpoint === "md") return siteCount % 2 !== 0;
  if (breakpoint === "lg" || breakpoint === "xl") return siteCount % 3 !== 0;
  return false;
}

/**
 * Thanks GitHub Copilot
 */
function searchSites(sites: Site[], search: string) {
  if (search === "") return sites;
  return sites.filter(site => site.name.toLowerCase().includes(search.toLowerCase()));
}

const Dashboard: NextPageWithLayout = () => {
  const { user } = useAuth();
  const breakpoint = useBreakpoint();
  const [search, setSearch] = useState("");
  if (!user) return <Loading />;
  if (user.sites.length === 0) return <EmptyState />;
  const sites = searchSites(user.sites, search);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Search"
          icon={SearchOutlinedIcon}
          type="text"
          value={search}
          onUpdate={setSearch}
        />
        <div className="flex flex-row gap-x-6">
          <Select
            icon={SortOutlinedIcon}
            label={["xs", "md", "unknown"].includes(breakpoint) ? undefined : "Sort by"}
            value="all"
            className="flex-grow"
            onUpdate={() => {}} // to silence the readOnly warning for now
          >
            <option value="active">Active</option>
            <option value="all">Comments</option>
            <option value="pending">Pending</option>
          </Select>
          <Button
            className="w-1/3 min-w-fit flex flex-row items-center justify-center gap-1"
            href="/app/new"
            icon={AddOutlinedIcon}
          >
            Add new site
          </Button>
        </div>
      </div>
      {sites.length === 0 ? (
        <EmptyState bySearch />
      ) : (
        <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site, i) => (
            <SiteCard site={site} key={i} />
          ))}
          {showEmptyCard(breakpoint, sites.length) && <EmptyCard />}
        </main>
      )}
    </>
  );
};

Dashboard.getLayout = page => (
  <AppLayout title="Dashboard" type="overview" activeTab="dashboard" loadingScreen={<Loading />}>
    {page}
  </AppLayout>
);

export default Dashboard;
