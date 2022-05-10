import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import useBuildId from "@client/hooks/buildId";

import A from "@client/components/anchor";
import Input from "@client/components/forms/input";
import ModeSwitcher from "@client/components/modeSwitcher";

import { NavData } from "@client/types/docs.type";

import logoText from "@client/public/images/logo-text.svg";

import DocsNav from "./navbar";

const DocsSidebar: FC<{ navData: NavData }> = ({ navData }) => {
  const buildId = useBuildId();
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  const [screenHeight, setScreenHeight] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScreenHeight = () => setScreenHeight(window.innerHeight);

    window.addEventListener("resize", handleScreenHeight);
    window.addEventListener("scroll", handleScreenHeight);
    handleScreenHeight();
    return () => {
      window.removeEventListener("resize", handleScreenHeight);
      window.removeEventListener("scroll", handleScreenHeight);
    };
  }, []);

  useEffect(() => setNavbarCollapsed(true), [router.asPath]);
  return (
    <div
      className={clsx(
        "fixed md:sticky top-0 inset-x-0 md:left-0 md:right-auto z-40 md:z-auto flex flex-col gap-6",
        "overflow-hidden px-6 sm:px-12 md:px-6 md:pt-12 md:pb-6",
        "bg-card md:!h-screen md:border-b-0 md:border-r border-card transition-all", // sorry for using !important
        navbarCollapsed ? "border-b py-3" : "border-b-0 py-6"
      )}
      style={{ height: navbarCollapsed ? "60px" : screenHeight + "px" }}
    >
      <div className="flex flex-row justify-between items-center">
        <A
          href="/"
          notStyled
          className={clsx(
            "relative block h-[30px] w-[calc(397px/80*30)]",
            "after:absolute after:content-['docs'] after:left-full after:top-1 after:ml-1.5",
            "after:text-primary after:uppercase after:text-sm",
            "after:bg-indigo-100 dark:after:bg-indigo-900 dark:after:bg-opacity-50",
            "after:px-1.5 after:py-0.5 after:rounded"
          )}
        >
          <Image src={logoText} alt="ezkomment" layout="responsive" width={397} height={80} />
        </A>
        <button
          className={clsx(
            "md:hidden text-neutral-600 dark:text-neutral-400 rounded p-1 transition leading-none",
            "hover:text-neutral-900 dark:hover:text-neutral-100"
          )}
          onClick={() => setNavbarCollapsed(!navbarCollapsed)}
        >
          {navbarCollapsed ? <DensityMediumOutlinedIcon /> : <ClearOutlinedIcon />}
        </button>
      </div>
      <Input icon={SearchOutlinedIcon} type="text" placeholder="Search" />
      <DocsNav navData={navData} />
      <footer className="flex flex-row justify-between items-center">
        {process.env.NODE_ENV === "development" && (
          <span className="text-muted font-mono">dev</span>
        )}
        {process.env.NODE_ENV === "production" && !buildId && (
          <span className="text-muted">Loading&hellip;</span>
        )}
        {process.env.NODE_ENV === "production" && buildId && (
          <A
            href={`https://github.com/joulev/ezkomment/commit/${buildId.hash}`}
            className="font-mono"
          >
            {buildId.hash}
          </A>
        )}
        <ModeSwitcher />
      </footer>
    </div>
  );
};

export default DocsSidebar;
