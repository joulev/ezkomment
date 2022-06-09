import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, MouseEventHandler, ReactNode, useEffect, useState } from "react";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import useAuth from "@client/hooks/auth";
import { signOut } from "@client/lib/firebase/auth";

import A from "@client/components/anchor";
import ModeSwitcher from "@client/components/modeSwitcher";

import { CurrentPage } from "@client/types/page.type";
import { IconType } from "@client/types/utils.type";

import defaultAvatar from "@client/public/images/default-photo.svg";
import logo from "@client/public/images/logo.svg";

type LinkOrButtonProps =
  | { href: string; onClick?: never }
  | { href?: never; onClick: MouseEventHandler<HTMLButtonElement> };
type TopNavItemProps = { icon: IconType; title?: string } & LinkOrButtonProps;

const TopNavButton: FC<TopNavItemProps> = ({ href, onClick, icon: Icon, title }) => {
  const classes = clsx(
    "text-neutral-600 dark:text-neutral-400 rounded p-1.5 transition leading-none",
    "hover:text-neutral-900 dark:hover:text-neutral-100", // styling for mobile
    "sm:hover:bg-indigo-100 sm:dark:hover:bg-indigo-900 sm:dark:hover:bg-opacity-50 sm:hover:text-primary" // styling for desktop
  );
  return href ? (
    <A href="/app/dashboard" notStyled className={classes} title={title}>
      <Icon />
    </A>
  ) : (
    <button className={classes} onClick={onClick} title={title}>
      <Icon />
    </button>
  );
};

const TopNavExpandedItem: FC<TopNavItemProps & { children: ReactNode }> = ({
  href,
  onClick,
  icon: Icon,
  children,
}) => {
  const classes = clsx(
    "py-3 mx-1 border-t border-card text-left flex flex-row items-center gap-3",
    "transition text-neutral-700 dark:text-neutral-300"
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
  <svg width={12} height={36}>
    <line x1="12" y1="0" x2="0" y2="36" className="stroke-neutral-500" />
  </svg>
);

const TopNavBreadcrumb: FC<CurrentPage> = ({ type, siteName, pageId }) => (
  <div className="flex flex-row gap-3 items-center">
    <A href="/app/dashboard" notStyled className="w-9 h-9 relative">
      <Image src={logo} alt="ezkomment" layout="fill" />
    </A>
    <BreadCrumbSlash />
    <A
      notStyled
      className="font-semibold text-lg"
      href={type === "overview" ? "/app/dashboard" : `/app/site/${siteName}`}
    >
      {type === "overview" ? "Overview" : siteName}
    </A>
    {pageId && (
      <>
        <BreadCrumbSlash />
        <A notStyled className="font-semibold text-lg" href={`/app/site/${siteName}/${pageId}`}>
          {/* Workaround; I think I will change it to the right approach of using text-transform in the future */}
          <span className="sm:hidden md:inline">{pageId}</span>
          <span className="hidden sm:inline md:hidden">{pageId.substring(0, 5)}&hellip;</span>
        </A>
      </>
    )}
  </div>
);

const TopNavMobileBreadcrumb: FC<CurrentPage> = ({ type, siteName, pageId }) => (
  <div className="flex flex-row gap-3 items-center">
    <A
      notStyled
      className="font-semibold"
      href={type === "overview" ? "/app/dashboard" : `/app/site/${siteName}`}
    >
      {type === "overview" ? "Overview" : siteName}
    </A>
    {pageId && (
      <>
        <BreadCrumbSlash />
        <A notStyled className="font-semibold" href={`/app/site/${siteName}/${pageId}`}>
          {pageId.substring(0, 5)}&hellip;
        </A>
      </>
    )}
  </div>
);

const TopNav: FC<CurrentPage> = props => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  useEffect(() => setExpanded(false), [router.pathname]);

  const auth = useAuth();
  const handleLogout: MouseEventHandler<HTMLButtonElement> = () => signOut(auth);
  const handleNotif: MouseEventHandler<HTMLButtonElement> = () => console.log("notif");

  return (
    <div className="container px-5 sm:px-6">
      <nav className="hidden sm:flex flex-row gap-6 pt-3 sm:pt-6 items-center justify-between">
        <TopNavBreadcrumb {...props} />
        <div className="flex-grow" />
        <TopNavButton
          onClick={handleNotif}
          icon={NotificationsOutlinedIcon}
          title="Notifications"
        />
        <TopNavButton onClick={handleLogout} icon={LogoutOutlinedIcon} title="Sign out" />
        <A
          href="/app/account"
          className={clsx(
            "rounded-full border border-indigo-500 dark:border-indigo-400 h-9 w-9 shrink-0 relative overflow-hidden",
            auth.user || "pulse"
          )}
          title="View account settings"
        >
          {auth.user && auth.user.photoURL && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={auth.user.photoURL} alt="avatar" className="w-9 h-9" />
          )}
          {auth.user && !auth.user.photoURL && (
            <Image src={defaultAvatar} alt="avatar" layout="fill" />
          )}
        </A>
      </nav>
      <div
        className={clsx(
          "sm:hidden overflow-hidden",
          // 24 + 2*4 (button padding) + 2*12 (topnav padding) = 56 = 14 * 4
          expanded ? "fixed inset-0 bg-card z-10 px-5" : "max-h-14"
        )}
      >
        <nav className="flex flex-row py-3 items-center justify-between">
          <TopNavButton
            icon={expanded ? CloseOutlinedIcon : MenuOutlinedIcon}
            onClick={() => setExpanded(!expanded)}
          />
          <TopNavMobileBreadcrumb {...props} />
          <TopNavButton onClick={handleNotif} icon={NotificationsOutlinedIcon} />
        </nav>
        <nav
          className={clsx(
            "flex flex-col transition-all",
            expanded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          <TopNavExpandedItem icon={HomeOutlinedIcon} href="/app/dashboard">
            Dashboard
          </TopNavExpandedItem>
          <TopNavExpandedItem icon={SettingsOutlinedIcon} href="/app/account">
            Account settings
          </TopNavExpandedItem>
          <TopNavExpandedItem icon={LogoutOutlinedIcon} onClick={handleLogout}>
            Log out
          </TopNavExpandedItem>
          <div className="flex flex-row justify-between items-center mx-1 mt-6">
            <Image src={logo} alt="ezkomment" width={36} height={36} />
            <ModeSwitcher />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default TopNav;
