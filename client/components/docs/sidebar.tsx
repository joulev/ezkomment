import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import version from "~/client/lib/version";

import A from "~/client/components/anchor";
import Input from "~/client/components/forms/input";
import ModeSwitcher from "~/client/components/modeSwitcher";

import { NavData } from "~/types/client/docs.type";

import logoText from "~/public/images/logo-text.svg";

import DocsNav from "./navbar";
import DocsSearchResults from "./searchResults";

function useScreenHeight() {
  const [screenHeight, setScreenHeight] = useState(0);
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
  return screenHeight;
}

function useNavbarCollapse() {
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  const router = useRouter();
  useEffect(() => setNavbarCollapsed(true), [router.asPath]);
  return {
    navbarCollapsed,
    toggleNavbarCollapse: () => setNavbarCollapsed(!navbarCollapsed),
  };
}

function useSearch() {
  const [search, setSearch] = useState("");
  const [internalSearch, setInternalSearch] = useState("");
  useEffect(() => {
    if (search === "") return setInternalSearch("");
    const timeoutRef = setTimeout(() => setInternalSearch(search), 300);
    return () => clearTimeout(timeoutRef);
  }, [search]);
  return { search, setSearch, internalSearch };
}

const DocsSidebar: FC<{ navData: NavData }> = ({ navData }) => {
  const { navbarCollapsed, toggleNavbarCollapse } = useNavbarCollapse();
  const screenHeight = useScreenHeight();
  const { search, setSearch, internalSearch } = useSearch();
  return (
    <aside
      className={clsx(
        "fixed inset-y-0 left-0 lg:right-0 w-full lg:w-96 lg:!h-screen z-40 lg:z-auto",
        "bg-card lg:border-b-0 lg:border-r border-card transition-all overflow-hidden",
        navbarCollapsed ? "border-b" : "border-b-0"
      )}
      style={{ height: navbarCollapsed ? "72px" : screenHeight + "px" }}
    >
      <div
        className={clsx(
          "container h-screen flex flex-col gap-6 lg:pt-12 lg:pb-6 transition-all",
          navbarCollapsed ? "py-4.5" : "pt-12 pb-6"
        )}
      >
        <div className="flex flex-row justify-between items-center">
          <A
            href="/"
            notStyled
            className={clsx(
              "relative block h-9 logo-width",
              "after:absolute after:content-['docs'] after:left-full after:top-1.5 after:ml-1.5",
              "after:text-primary after:uppercase after:text-sm",
              "after:bg-indigo-100 dark:after:bg-indigo-800 dark:after:bg-opacity-50",
              "after:px-1.5 after:py-0.5 after:rounded"
            )}
          >
            <Image src={logoText} alt="ezkomment" />
          </A>
          <button
            className={clsx(
              "lg:hidden text-neutral-600 dark:text-neutral-400 rounded p-1 transition leading-none",
              "hover:text-neutral-900 dark:hover:text-neutral-100"
            )}
            onClick={toggleNavbarCollapse}
          >
            {navbarCollapsed ? <MenuOutlinedIcon /> : <ClearOutlinedIcon />}
          </button>
        </div>
        <Input
          icon={SearchOutlinedIcon}
          type="text"
          placeholder="Search"
          value={search}
          onUpdate={setSearch}
        />
        <div className="flex-grow min-h-0 overflow-y-auto no-scrollbar">
          {search ? (
            <DocsSearchResults query={internalSearch} loading={internalSearch !== search} />
          ) : (
            <DocsNav navData={navData} />
          )}
        </div>
        <footer className="flex flex-row justify-between items-center">
          <A className="text-sm" href={version.href}>
            {version.version}
          </A>
          <ModeSwitcher />
        </footer>
      </div>
    </aside>
  );
};

export default DocsSidebar;
