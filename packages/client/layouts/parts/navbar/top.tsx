import clsx from "clsx";
import Image from "next/image";
import type { FC, MouseEventHandler } from "react";
import { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import A from "@client/components/anchor";

type LinkOrButtonProps =
  | { href: string; onClick?: never }
  | { href?: never; onClick: MouseEventHandler<HTMLButtonElement> };
type TopNavItemProps = { icon: typeof HomeOutlinedIcon } & LinkOrButtonProps;

const TopNavButton: FC<TopNavItemProps> = ({ href, onClick, icon: Icon }) => {
  const classes = clsx(
    "text-gray-500 rounded p-1 transition leading-none",
    "hover:text-gray-900", // styling for mobile
    "sm:hover:bg-indigo-100 sm:hover:text-indigo-500" // styling for desktop
  );
  return href ? (
    <A href="/app" notStyled className={classes}>
      <Icon />
    </A>
  ) : (
    <button className={classes} onClick={onClick}>
      <Icon />
    </button>
  );
};

const TopNavExpandedItem: FC<TopNavItemProps> = ({ href, onClick, icon: Icon, children }) => {
  const classes = clsx(
    "py-3 mx-1 border-t border-gray-300 text-left flex flex-row items-center gap-3",
    "transition text-gray-500 hover:text-gray-900"
  );
  return href ? (
    <A href={href} notStyled className={classes}>
      <Icon />
      <div>{children}</div>
    </A>
  ) : (
    <button onClick={onClick} className={classes}>
      <Icon />
      <div>{children}</div>
    </button>
  );
};

const BreadCrumbSlash: FC = () => (
  <svg width={12} height={32}>
    <line x1="12" y1="0" x2="0" y2="32" className="stroke-gray-300" />
  </svg>
);

const TopNav: FC = () => {
  const [expanded, setExpanded] = useState(false);
  const handleLogout: MouseEventHandler<HTMLButtonElement> = () => console.log("log out");
  const handleNotif: MouseEventHandler<HTMLButtonElement> = () => console.log("notif");

  return (
    <div className="container px-5 sm:px-6">
      <nav className="hidden sm:flex flex-row gap-6 py-3 sm:pt-6 items-center justify-between">
        <div className="flex flex-row gap-3 items-center">
          <A href="/app" notStyled className="w-8 h-8 relative">
            <Image src="/logo.svg" alt="ezkomment" layout="fill" />
          </A>
          <BreadCrumbSlash />
          <div className="font-semibold">Overview</div>
        </div>
        <div className="flex-grow" />
        <TopNavButton href="/app" icon={HomeOutlinedIcon} />
        <TopNavButton onClick={handleNotif} icon={NotificationsOutlinedIcon} />
        <A href="/app/account" className="h-8 w-8 shrink-0 relative">
          <Image src="/default-photo.svg" alt="" layout="fill" />
        </A>
        <TopNavButton onClick={handleLogout} icon={LogoutOutlinedIcon} />
      </nav>
      <div
        className={clsx(
          "sm:hidden overflow-hidden",
          // 24 + 2*4 (button padding) + 2*12 (topnav padding) = 56 = 14 * 4
          expanded ? "fixed inset-0 bg-white z-10 px-5" : "max-h-14"
        )}
      >
        <nav className="flex flex-row py-3 items-center justify-between">
          <TopNavButton
            icon={expanded ? CloseOutlinedIcon : DensityMediumOutlinedIcon}
            onClick={() => setExpanded(!expanded)}
          />
          <div className="font-semibold">Overview</div>
          <TopNavButton onClick={handleNotif} icon={NotificationsOutlinedIcon} />
        </nav>
        <nav
          className={clsx(
            "flex flex-col transition-all",
            expanded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          <TopNavExpandedItem icon={HomeOutlinedIcon} href="/app">
            Dashboard
          </TopNavExpandedItem>
          <TopNavExpandedItem icon={SettingsOutlinedIcon} href="/app/account">
            Account settings
          </TopNavExpandedItem>
          <TopNavExpandedItem icon={LogoutOutlinedIcon} onClick={handleLogout}>
            Log out
          </TopNavExpandedItem>
        </nav>
      </div>
    </div>
  );
};

export default TopNav;
