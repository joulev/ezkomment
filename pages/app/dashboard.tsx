import clsx from "clsx";
import { FC, RefObject, forwardRef, useEffect, useRef, useState } from "react";
import useSWR from "swr";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";

import useAuth from "~/client/hooks/auth";
import useBreakpoint from "~/client/hooks/breakpoint";
import { internalSWRGenerator } from "~/client/lib/fetcher";

import A from "~/client/components/anchor";
import Button from "~/client/components/buttons";
import Input from "~/client/components/forms/input";
import Select from "~/client/components/forms/select";
import AppLayout from "~/client/layouts/app";

import { NextPageWithLayout } from "~/types/client/utils.type";
import { FetchOptions } from "~/types/client/utils.type";
import { Site } from "~/types/server";

const Loading: FC = () => (
  <>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="col-span-2 h-9 pulse" />
      <div className="col-span-1 h-9 pulse" />
      <div className="col-span-1 h-9 pulse" />
    </div>
    <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {[...Array(16)].map((_, i) => (
        <SiteCard key={i} />
      ))}
    </main>
  </>
);

const EmptyState: FC = () => (
  <div className="flex flex-col md:flex-row items-center md:justify-center my-12 md:my-18 gap-12 md:gap-18">
    <svg
      className={clsx(
        "text-neutral-300 dark:text-neutral-700 flex-shrink-0",
        "w-[calc(286px/1.5)] sm:w-[256px] h-[calc(256px/1.5)] sm:h-[256px]"
      )}
      viewBox="0 0 286 256"
    >
      <path
        d="M195.5 0.5C247.25 0.5 285.5 35.6553 285.5 75.3467C285.5 112.97 253.154 135.309 236.369 142.364C235.035 142.925 234.492 144.56 235.271 145.789L255.051 176.998C256.294 178.959 254.15 181.31 252.107 180.226L195.992 150.454C195.669 150.283 195.305 150.194 194.94 150.192C143.474 149.94 105.5 114.895 105.5 75.3467C105.5 35.6553 143.75 0.5 195.5 0.5Z"
        className="stroke-card fill-card stroke-1"
      />
      <rect
        width="90"
        height="12"
        rx="4"
        transform="matrix(-1 0 0 1 240.5 48.5)"
        className="fill-current"
      />
      <rect
        width="90"
        height="12"
        rx="4"
        transform="matrix(-1 0 0 1 240.5 69.5)"
        className="fill-current"
      />
      <rect
        width="90"
        height="12"
        rx="4"
        transform="matrix(-1 0 0 1 240.5 90.5)"
        className="fill-current"
      />
      <path
        d="M90.5 75.5C38.75 75.5 0.5 110.655 0.5 150.347C0.5 187.97 32.8458 210.309 49.6308 217.364C50.9653 217.925 51.5077 219.56 50.7292 220.789L30.949 251.998C29.7059 253.959 31.8497 256.31 33.8929 255.226L90.0079 225.454C90.3313 225.283 90.6949 225.194 91.06 225.192C142.526 224.94 180.5 189.895 180.5 150.347C180.5 110.655 142.25 75.5 90.5 75.5Z"
        className="stroke-card fill-card stroke-1"
      />
      <rect x="45.5" y="123.5" width="90" height="12" rx="4" className="fill-current" />
      <rect x="45.5" y="144.5" width="90" height="12" rx="4" className="fill-current" />
      <rect x="45.5" y="165.5" width="90" height="12" rx="4" className="fill-current" />
    </svg>
    <div className="flex flex-col gap-9 justify-center">
      <div className="text-2xl sm:text-4xl text-center md:text-left">
        Add a new site to get&nbsp;started
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

const SiteCard = forwardRef<HTMLAnchorElement, { site?: Site }>(({ site }, ref) => (
  <A
    notStyled
    className="cursor-pointer p-6 transition bg-card rounded border border-card hover:border-muted"
    href={site ? `/app/site/${site.name}` : undefined}
    ref={ref}
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
            <div className="text-xl font-semibold mb-1">{site.name}</div>
            <div className="text-sm text-muted">{site.domain}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Stats label="pages" value={0} />
          <Stats label="comments" value={0} />
          <Stats label="pending" value={0} />
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
));
SiteCard.displayName = "SiteCard";

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

function useEmptyCard() {
  const [showEmptyCard, setShowEmptyCard] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const lastRowIsNotFilled = (
      containerRef: RefObject<HTMLDivElement>,
      lastCardRef: RefObject<HTMLAnchorElement>
    ) => {
      if (!containerRef.current || !lastCardRef.current) return false;
      const container = containerRef.current;
      const card = lastCardRef.current;
      return card.offsetLeft + card.offsetWidth < container.offsetLeft + container.offsetWidth - 20;
    };

    const update = () => setShowEmptyCard(lastRowIsNotFilled(containerRef, lastCardRef));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return { showEmptyCard, containerRef, lastCardRef };
}

const Dashboard: NextPageWithLayout = () => {
  const { user } = useAuth();
  const breakpoint = useBreakpoint();
  const { showEmptyCard, containerRef, lastCardRef } = useEmptyCard();

  const { data } = useSWR(
    user ? { url: `/api/users/${user.uid}/sites` } : null,
    internalSWRGenerator<Site[]>(),
    { fallbackData: [] }
  );

  if (!data) return <Loading />;
  if (data.length === 0) return <EmptyState />;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Search" icon={SearchOutlinedIcon} type="text" />
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
      <main
        className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
        ref={containerRef}
      >
        {data.map((site, i) => (
          <SiteCard site={site} key={i} ref={i === data.length - 1 ? lastCardRef : null} />
        ))}
        {showEmptyCard && <EmptyCard />}
      </main>
    </>
  );
};

Dashboard.getLayout = page => (
  <AppLayout title="Dashboard" type="overview" activeTab="dashboard" loadingScreen={<Loading />}>
    {page}
  </AppLayout>
);

export default Dashboard;
