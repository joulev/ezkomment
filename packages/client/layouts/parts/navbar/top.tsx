import Image from "next/image";
import type { FC, MouseEventHandler } from "react";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import A from "@client/components/anchor";

const BreadCrumbSlash: FC = () => (
  <svg width={12} height={32}>
    <line x1="12" y1="0" x2="0" y2="32" className="stroke-gray-300" />
  </svg>
);

type TopNavButtonProps = {
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon: FC;
};
const TopNavButton: FC<TopNavButtonProps> = ({ href, onClick, icon: Icon }) => {
  const navbarBtnStyle =
    "text-gray-500 rounded p-1 transition hover:bg-indigo-100 hover:text-indigo-500";
  return href ? (
    <A href="/app" notStyled className={navbarBtnStyle}>
      <Icon />
    </A>
  ) : (
    <button className={navbarBtnStyle} onClick={onClick}>
      <Icon />
    </button>
  );
};

const TopNav: FC = () => (
  <>
    <nav className="hidden sm:flex flex-row gap-6 py-3 items-center justify-between">
      <div className="flex flex-row gap-3 items-center">
        <A href="/app" notStyled className="w-8 h-8 relative">
          <Image src="/logo.svg" alt="ezkomment" layout="fill" />
        </A>
        <BreadCrumbSlash />
        <div className="font-semibold">Overview</div>
      </div>
      <div className="flex-grow" />
      <TopNavButton href="/app" icon={HomeOutlinedIcon} />
      <TopNavButton icon={NotificationsOutlinedIcon} />
      <A href="/app/account" className="h-8 w-8 shrink-0 relative">
        <Image src="/default-photo.svg" alt="" layout="fill" />
      </A>
      <TopNavButton icon={LogoutOutlinedIcon} />
    </nav>
    <nav className="sm:hidden flex flex-row py-3 items-center justify-between">
      <TopNavButton icon={DensityMediumOutlinedIcon} />
      <div className="font-semibold">Overview</div>
      <TopNavButton icon={NotificationsOutlinedIcon} />
    </nav>
  </>
);

export default TopNav;
