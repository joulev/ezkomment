import clsx from "clsx";
import { getAuth } from "firebase/auth";
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

const SiteCard = forwardRef<HTMLAnchorElement, { site: Site }>(({ site }, ref) => (
  <A
    notStyled
    className={clsx(
      "cursor-pointer p-6 transition",
      "bg-card rounded border border-card",
      "hover:border-neutral-700 dark:hover:border-neutral-300"
    )}
    href={`/app/site/${site.name}`}
    ref={ref}
  >
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
  </A>
));
SiteCard.displayName = "SiteCard";

const EmptyCard: FC = () => {
  const strokeClasses = clsx(
    "stroke-neutral-300 dark:stroke-neutral-700 group-hover:stroke-neutral-500",
    "stroke-[4px] transition"
  );
  return (
    <A
      href="/app/new"
      notStyled
      className={clsx(
        "rounded border border-dashed border-card",
        "grid place-items-center transition cursor-pointer group",
        "text-neutral-300 dark:text-neutral-700 hover:text-muted"
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <svg width={36} height={36}>
          <line x1="18" y1="0" x2="18" y2="36" className={strokeClasses} />
          <line x1="0" y1="18" x2="36" y2="18" className={strokeClasses} />
        </svg>
        <span>Add new site</span>
      </div>
    </A>
  );
};

const Dashboard: NextPageWithLayout<Props> = ({ sites }) => {
  const user = getAuth().currentUser;
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
      <h1>{user ? <>Welcome, {user.email}</> : "Not authenticated"}</h1>
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

Dashboard.getLayout = page => (
  <AppLayout title="Dashboard" type="overview" activeTab="dashboard">
    {page}
  </AppLayout>
);

export const getStaticProps: GetStaticProps<Props> = () => ({ props: { sites } });

export default Dashboard;
