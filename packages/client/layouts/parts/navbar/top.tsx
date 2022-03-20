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

type TopNavButtonProps = { href?: string; onClick?: MouseEventHandler<HTMLButtonElement> };
const TopNavButton: FC<TopNavButtonProps> = ({ href, onClick, children }) => {
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

const TopNav: FC = () => (
  <nav className="flex flex-row gap-6 py-3 items-center justify-between">
    <div className="hidden sm:flex flex-row gap-3 items-center">
      <A href="/app" notStyled className="w-8 h-8 relative">
        <Image src="/logo.svg" alt="ezkomment" layout="fill" />
      </A>
      <BreadCrumbSlash />
      <div className="text-xl">Overview</div>
    </div>
    <div className="hidden sm:block flex-grow" />
    <TopNavButton href="/app">
      <HomeOutlinedIcon />
    </TopNavButton>
    <TopNavButton>
      <NotificationsOutlinedIcon />
    </TopNavButton>
    <A href="/app/account" className="h-8 w-8 shrink-0 relative">
      <Image src="/default-photo.svg" alt="" layout="fill" />
    </A>
    <TopNavButton>
      <LogoutOutlinedIcon />
    </TopNavButton>
  </nav>
);

export default TopNav;
