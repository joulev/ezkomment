"use client";

/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Plus, Search, SortDesc } from "lucide-react";
import { internalPost } from "~/app/(auth)/internal-fetch";
import { useUser } from "~/app/(auth)/app/user";
import { Breakpoint, useBreakpoint } from "~/app/breakpoint";
import A from "~/app/components/anchor.client";
import BlankIllustration from "~/app/components/blank-illustration";
import Button from "~/app/components/buttons.client";
import Input from "~/app/components/forms/input";
import Select from "~/app/components/forms/select";
import { Site } from "~/types/server";

function EmptyState({ bySearch }: { bySearch?: boolean }) {
  return (
    <div className="flex flex-col md:flex-row items-center md:justify-center my-12 md:my-18 gap-12 md:gap-18">
      <div className="flex-shrink-0 w-[calc(286px/1.5)] sm:w-[256px]">
        <BlankIllustration />
      </div>
      <div className="flex flex-col gap-9 justify-center">
        <div className="text-2xl sm:text-4xl text-center md:text-left">
          {bySearch ? "No sites found" : <>Add a new site to get&nbsp;started</>}
        </div>
        <div className="text-center md:text-left">
          <Button href="/app/new" className="inline-block" icon={Plus}>
            Add a new site
          </Button>
        </div>
      </div>
    </div>
  );
}

function Stats({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="text-3xl font-light">{value}</div>
      <div className="text-muted text-xs uppercase tracking-widest">{label}</div>
    </div>
  );
}

function SiteIcon({ site }: { site: Site }) {
  const [url, setUrl] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (site.iconURL) setUrl(site.iconURL);
    else {
      (async () => {
        const { success, body } = await internalPost<{ url: string }>("/api/sites/icon-url", {
          domain: site.domain,
        });
        if (success) setUrl((body as { url: string }).url);
        else setUrl("/images/logo.svg");
      })();
    }
  }, [site.iconURL, site.domain]);
  if (!url) return <div className="w-12 h-12 shrink-0 rounded pulse" />;
  return <img src={url} alt="" className="w-12 h-12 shrink-0 rounded" />;
}

function SiteCard({ site }: { site: Site }) {
  return (
    <A
      notStyled
      className="p-6 transition bg-card rounded border border-card cursor-pointer hover:border-muted"
      href={`/app/site/${site.name}`}
    >
      <div className="flex flex-row gap-6 items-center mb-6">
        <SiteIcon site={site} />
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
    </A>
  );
}

function EmptyCard() {
  return (
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
}

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

function sortSites(sites: Site[], sort: "pages" | "comments" | "pending" | "updated") {
  if (sort === "pages") return sites.sort((a, b) => b.pageCount - a.pageCount);
  if (sort === "comments") return sites.sort((a, b) => b.totalCommentCount - a.totalCommentCount);
  if (sort === "pending")
    return sites.sort((a, b) => b.pendingCommentCount - a.pendingCommentCount);
  if (sort === "updated") return sites.sort((a, b) => b.lastUpdated - a.lastUpdated);
  return sites;
}

export default function AppDashboardPage() {
  const user = useUser();
  const breakpoint = useBreakpoint();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"pages" | "comments" | "pending" | "updated">("pages");
  if (user.sites.length === 0) return <EmptyState />;
  const sites = sortSites(searchSites(user.sites, search), sort);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Search" icon={Search} type="text" value={search} onUpdate={setSearch} />
        <div className="flex flex-row gap-x-6">
          <Select
            icon={SortDesc}
            label={["xs", "md", "unknown"].includes(breakpoint) ? undefined : "Sort by"}
            value={sort}
            className="flex-grow"
            onUpdate={setSort as any}
          >
            <option value="pages">Pages</option>
            <option value="comments">Comments</option>
            <option value="pending">Pending</option>
            <option value="updated">Last updated</option>
          </Select>
          <Button
            className="w-1/3 min-w-fit flex flex-row items-center justify-center gap-1"
            href="/app/new"
            icon={Plus}
          >
            Add new site
          </Button>
        </div>
      </div>
      {sites.length === 0 ? (
        <EmptyState bySearch />
      ) : (
        <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map(site => (
            <SiteCard site={site} key={site.id} />
          ))}
          {showEmptyCard(breakpoint, sites.length) && <EmptyCard />}
        </main>
      )}
    </>
  );
}
