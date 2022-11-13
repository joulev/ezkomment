"use client";

import clsx from "clsx";
import { useState } from "react";
import useSWR from "swr";
import { Plus, Code, Tag, Globe, Search, Settings } from "lucide-react";
import { internalSWRGenerator } from "~/app/(auth)/internal-fetch";
import { PAGE } from "~/misc/validate";
import { useBreakpoint } from "~/app/breakpoint";
import { useSite } from "~/app/(auth)/app/site/[siteName]/site";
import A from "~/app/components/anchor.client";
import BlankIllustration from "~/app/components/blank-illustration";
import Button from "~/app/components/buttons.client";
import Input from "~/app/components/forms/input";
import InputDetachedLabel from "~/app/components/forms/input-detached-label";
import Modal from "~/app/components/modal.client";
import TimeAgo from "~/app/components/time-ago.client";
import RightAligned from "~/app/components/utils/right-aligned";
import SiteIcon from "~/app/(auth)/app/components/site-icon.client";
import SiteGraph from "./components/site-graph.client";
import { Page, SiteStatistics } from "~/types/server";

function Stats({ value, label, small }: { value: number; label: string; small?: boolean }) {
  return (
    <div>
      <div className={clsx("font-light tracking-tighter", small ? "text-3xl" : "text-4xl")}>
        {value}
      </div>
      <div className={clsx("text-muted", small && "text-sm")}>{label}</div>
    </div>
  );
}

function AddPageModal({ show, onClose }: { show: boolean; onClose: () => void }) {
  const { site } = useSite();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  return (
    <Modal isVisible={show} onOutsideClick={onClose}>
      <div className="p-6 max-w-lg">
        <h2>Add a new page</h2>
        <p>
          Please fill in these information. They won&apos;t be used for us to identify the pages,
          however correct information would help you identify your pages from this site dashboard.
        </p>
        <form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
          <InputDetachedLabel
            label="Page title"
            icon={Tag}
            type="text"
            required
            value={title}
            onUpdate={setTitle}
            isInvalid={!(title === "" && url === "") && !PAGE.titleIsValid(title)}
          />
          <InputDetachedLabel
            label="Page URL"
            icon={Globe}
            type="url"
            required
            value={url}
            onUpdate={setUrl}
            isInvalid={!(title === "" && url === "") && !PAGE.urlMatchDomain(url, site.domain)}
            placeholder={site.domain !== "*" ? `https://${site.domain}/page` : undefined}
          />
          {url !== "" && !PAGE.urlMatchDomain(url, site.domain) && (
            <p className="text-red-500 text-sm -mt-3">
              Your URL does not match the site domain ({site.domain}).
            </p>
          )}
          <RightAligned className="gap-6">
            <Button variant="tertiary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!PAGE.titleIsValid(title) || !PAGE.urlMatchDomain(url, site.domain)}
            >
              Create
            </Button>
          </RightAligned>
        </form>
      </div>
    </Modal>
  );
}

function searchPages(pages: Page[], search: string) {
  if (search === "") return pages;
  return pages.filter(page => page.title.toLowerCase().includes(search.toLowerCase()));
}

export default function AppSiteOverviewPage() {
  const { site } = useSite();
  const breakpoint = useBreakpoint();
  const [showNewPageModal, setShowNewPageModal] = useState(false);
  const [search, setSearch] = useState("");
  const { data: statistics } = useSWR(
    `/api/sites/${site.id}/statistics`,
    internalSWRGenerator<SiteStatistics>()
  );
  const pages = searchPages(site.pages, search);
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start gap-y-6 mb-6">
        <div className="flex flex-row gap-6 items-center">
          <div>
            <SiteIcon size={64} iconURL={site.iconURL} domain={site.domain} />
          </div>
          <div>
            <div className="mb-1.5 text-3xl">{site.name}</div>
            <div className="flex flex-row gap-3 text-muted">
              <Globe />
              {site.domain === "*" ? (
                <span>All domains</span>
              ) : (
                <A
                  href={`https://${site.domain}`}
                  notStyled
                  className="hover:text-neutral-900 dark:hover:text-neutral-100 transition"
                >
                  {site.domain}
                </A>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-auto grid grid-cols-2 gap-6">
          <Button icon={Code} variant="tertiary" href={`/app/site/${site.name}/customise`}>
            Customise
          </Button>
          <Button icon={Settings} href={`/app/site/${site.name}/settings`}>
            Manage
          </Button>
        </div>
      </div>
      {site.pages.length === 0 ? (
        <div className="flex flex-col gap-6 my-12 items-center">
          <div className="w-48">
            <BlankIllustration />
          </div>
          <div className="text-xl text-center">
            Create a new page to start collecting&nbsp;comments.
          </div>
          <div>
            <Button icon={Plus} onClick={() => setShowNewPageModal(true)} className="inline-block">
              Add a new page
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-9">
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3">
              <Stats label="pages" value={site.pages.length} />
              <Stats label="comments" value={site.totalCommentCount} />
              <Stats label="pending" value={site.pendingCommentCount} />
            </div>
            <h2>Last 30 days</h2>
            {statistics ? (
              <SiteGraph
                totalComment={[...statistics.totalComment].reverse()}
                newComment={[...statistics.newComment].reverse()}
              />
            ) : (
              <div className="aspect-h-8 aspect-w-12 md:aspect-h-6 lg:aspect-h-8 rounded border border-card bg-card">
                <div className="grid place-items-center h-full">Loading statistics&hellip;</div>
              </div>
            )}
          </div>
          <div className="lg:col-span-7">
            <h2>All pages</h2>
            <div className="flex flex-row gap-6 mb-6">
              <Input
                type="text"
                label={["xs", "sm"].includes(breakpoint) ? null : "Search"}
                icon={Search}
                className="flex-grow"
                value={search}
                onUpdate={setSearch}
              />
              <Button
                icon={breakpoint === "xs" ? undefined : Plus}
                onClick={() => setShowNewPageModal(true)}
              >
                {breakpoint === "xs" ? "New page" : "Add a new page"}
              </Button>
            </div>
            {pages.length === 0 ? (
              <div className="flex flex-col gap-6 my-12 items-center">
                <div className="w-48">
                  <BlankIllustration />
                </div>
                <div className="text-xl text-center">No pages found</div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {pages
                  .sort((a, b) => b.lastUpdated - a.lastUpdated)
                  .map((page, i) => (
                    <A
                      notStyled
                      key={i}
                      className="p-6 bg-card rounded border border-card hover:border-muted flex flex-col transition"
                      href={`/app/site/${site.name}/${page.id}`}
                    >
                      <div className="font-semibold text-lg mb-1.5">{page.title}</div>
                      <div className="text-muted text-sm mb-6">{page.url}</div>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-y-6">
                        <div className="grid grid-cols-2 sm:gap-12">
                          <Stats small label="comments" value={page.totalCommentCount} />
                          <Stats small label="pending" value={page.pendingCommentCount} />
                        </div>
                        <div className="text-sm text-muted">
                          Updated <TimeAgo date={page.lastUpdated} />
                        </div>
                      </div>
                    </A>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
      <AddPageModal show={showNewPageModal} onClose={() => setShowNewPageModal(false)} />
    </>
  );
}
