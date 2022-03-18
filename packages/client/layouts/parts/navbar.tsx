import clsx from "clsx";
import Image from "next/image";
import type { FC } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const BreadCrumbSlash: FC = () => (
  <svg width={12} height={32}>
    <line x1="12" y1="0" x2="0" y2="32" className="stroke-gray-300" />
  </svg>
);

const Navbar: FC = () => (
  <header className="bg-white border-b border-gray-300">
    <nav className="container flex flex-row gap-6 py-3 items-center">
      <div className="flex flex-row gap-3 items-center">
        <Image src="/logo.svg" alt="ezkomment" width={32} height={32} />
        <BreadCrumbSlash />
        <div className="text-xl">Overview</div>
      </div>
      <div className="flex-grow" />
      <div>
        <HomeOutlinedIcon />
      </div>
      <div>
        <NotificationsOutlinedIcon />
      </div>
      <div className="h-8 w-8 relative">
        <Image src="/default-photo.svg" alt="" layout="fill" />
      </div>
      <div>
        <LogoutOutlinedIcon />
      </div>
    </nav>
  </header>
);

export default Navbar;
