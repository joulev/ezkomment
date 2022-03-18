import Image from "next/image";
import type { FC } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import A from "@client/components/anchor";

const navbarBtnStyle =
  "text-gray-500 rounded p-1 transition hover:bg-indigo-100 hover:text-indigo-500";

const BreadCrumbSlash: FC = () => (
  <svg width={12} height={32}>
    <line x1="12" y1="0" x2="0" y2="32" className="stroke-gray-300" />
  </svg>
);

const Navbar: FC = () => (
  <header className="bg-white border-b border-gray-300">
    <nav className="container flex flex-row gap-6 py-3 items-center justify-between">
      <div className="hidden sm:flex flex-row gap-3 items-center">
        <A href="/app" notStyled className="w-8 h-8 relative">
          <Image src="/logo.svg" alt="ezkomment" layout="fill" />
        </A>
        <BreadCrumbSlash />
        <div className="text-xl">Overview</div>
      </div>
      <div className="hidden sm:block flex-grow" />
      <A href="/app" notStyled className={navbarBtnStyle}>
        <HomeOutlinedIcon />
      </A>
      <button className={navbarBtnStyle}>
        <NotificationsOutlinedIcon />
      </button>
      <A href="/app/account" className="h-8 w-8 shrink-0 relative">
        <Image src="/default-photo.svg" alt="" layout="fill" />
      </A>
      <button className={navbarBtnStyle}>
        <LogoutOutlinedIcon />
      </button>
    </nav>
  </header>
);

export default Navbar;
