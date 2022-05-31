import clsx from "clsx";
import { GetStaticProps } from "next";
import { FC, RefObject, forwardRef, useEffect, useRef, useState } from "react";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";

import useBreakpoint from "@client/hooks/breakpoint";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";
import Input from "@client/components/forms/input";
import Select from "@client/components/forms/select";
import AppLayout from "@client/layouts/app";

import { NextPageWithLayout } from "@client/types/utils.type";

import sites from "@client/sample/sites.json";

type Site = typeof sites[number];
type Props = { sites: Site[] };

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
        <div className="flex flex-row gap-6 mb-3">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.iconURL} alt="" width={48} height={48} loading="lazy" />
          </div>
          <div>
            <div className="text-xl font-semibold">{site.name}</div>
            <div className="text-sm">{site.domain}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Stats label="pages" value={site.pageCount} />
          <Stats label="comments" value={site.totalCommentCount} />
          <Stats label="pending" value={site.needsApproval} />
        </div>
      </>
    ) : (
      <>
        <div className="flex flex-row gap-6 mb-3">
          <div>
            <div className="w-12 h-12 rounded-full pulse" />
          </div>
          <div>
            <div className="h-6 w-36 rounded pulse mb-1" />
            <div className="h-4 w-32 rounded pulse" />
          </div>
        </div>
        <div className="h-7 rounded pulse mb-3" />
        <div className="h-4 rounded pulse" />
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

const Dashboard: NextPageWithLayout<Props> = ({ sites }) => {
  const breakpoint = useBreakpoint();

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
        {sites.map((site, i) => (
          <SiteCard site={site} key={i} ref={i === sites.length - 1 ? lastCardRef : null} />
        ))}
        {showEmptyCard && <EmptyCard />}
      </main>
    </>
  );
};

const Loading: FC = () => (
  <>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="col-span-2 h-9 rounded pulse" />
      <div className="col-span-1 h-9 rounded pulse" />
      <div className="col-span-1 h-9 rounded pulse" />
    </div>
    <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {[...Array(16)].map((_, i) => (
        <SiteCard key={i} />
      ))}
    </main>
  </>
);

Dashboard.getLayout = page => (
  <AppLayout title="Dashboard" type="overview" activeTab="dashboard" loadingScreen={<Loading />}>
    {page}
  </AppLayout>
);

export const getStaticProps: GetStaticProps<Props> = () => ({ props: { sites } });

export default Dashboard;
