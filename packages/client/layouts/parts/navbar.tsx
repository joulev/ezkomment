import clsx from "clsx";
import Image from "next/image";
import type { FC, MouseEventHandler } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import A from "@client/components/anchor";

const BreadCrumbSlash: FC = () => (
  <svg width={12} height={32}>
    <line x1="12" y1="0" x2="0" y2="32" className="stroke-gray-300" />
  </svg>
);

type TopNavbarButtonProps = { href?: string; onClick?: MouseEventHandler<HTMLButtonElement> };
const TopNavbarButton: FC<TopNavbarButtonProps> = ({ href, onClick, children }) => {
  const navbarBtnStyle =
    "text-gray-500 rounded p-1 transition hover:bg-indigo-100 hover:text-indigo-500";
  return href ? (
    <A href="/app" notStyled className={navbarBtnStyle}>
      {children}
    </A>
  ) : (
    <button className={navbarBtnStyle} onClick={onClick}>
      {children}
    </button>
  );
};

type MainNavbarButtonProps = { href: string; active?: boolean; className?: string };
const MainNavbarButton: FC<MainNavbarButtonProps> = ({ href, active, className, children }) => {
  return (
    <A
      href={href}
      notStyled
      className={clsx(
        "py-1 px-2 rounded transition hover:bg-gray-200 hover:text-gray-900 whitespace-nowrap",
        active ? "text-gray-900" : "text-gray-500",
        active &&
          "relative after:absolute after:-bottom-2 after:inset-x-2 after:h-0 after:border-b after:border-gray-900",
        className
      )}
    >
      {children}
    </A>
  );
};

const Navbar: FC = () => (
  <header className="bg-white border-b border-gray-300">
    <div className="container">
      <nav className="flex flex-row gap-6 py-3 items-center justify-between">
        <div className="hidden sm:flex flex-row gap-3 items-center">
          <A href="/app" notStyled className="w-8 h-8 relative">
            <Image src="/logo.svg" alt="ezkomment" layout="fill" />
          </A>
          <BreadCrumbSlash />
          <div className="text-xl">Overview</div>
        </div>
        <div className="hidden sm:block flex-grow" />
        <TopNavbarButton href="/app">
          <HomeOutlinedIcon />
        </TopNavbarButton>
        <TopNavbarButton>
          <NotificationsOutlinedIcon />
        </TopNavbarButton>
        <A href="/app/account" className="h-8 w-8 shrink-0 relative">
          <Image src="/default-photo.svg" alt="" layout="fill" />
        </A>
        <TopNavbarButton>
          <LogoutOutlinedIcon />
        </TopNavbarButton>
      </nav>
      <nav className="max-w-full overflow-scroll no-scrollbar sm:overflow-visible">
        <div className="flex flex-row gap-2 sm:-ml-2 pb-2">
          <MainNavbarButton href="/" active>
            All pages
          </MainNavbarButton>
          <MainNavbarButton href="/" className="sm:hidden">
            Pending
          </MainNavbarButton>
          <MainNavbarButton href="/" className="hidden sm:block">
            Pending comments
          </MainNavbarButton>
          <MainNavbarButton href="/" className="sm:hidden">
            Customise
          </MainNavbarButton>
          <MainNavbarButton href="/" className="hidden sm:block">
            Customise display
          </MainNavbarButton>
          <MainNavbarButton href="/">Settings</MainNavbarButton>
        </div>
      </nav>
    </div>
  </header>
);

export default Navbar;
