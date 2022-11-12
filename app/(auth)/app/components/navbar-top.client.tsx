"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { X, Home, LogOut, Menu, Bell, Settings, Icon } from "lucide-react";
import { useAuth } from "~/app/(auth)/app/user";
import { useLoadingState } from "~/app/loading-state";
import { useSetToast } from "~/app/(auth)/toast";
import { signOut } from "~/app/(auth)/auth";
import useNotifications from "~/app/(auth)/app/notification";
import A from "~/app/components/anchor.client";
import AuthError from "~/app/components/auth-error";
import Logo from "~/app/components/logo/logo";
import LogoText from "~/app/components/logo/logo-text";
import DefaultPhoto from "~/app/components/default-photo";
import Notifications from "./notification.client";
import { CurrentPage } from "~/old/types/client/page.type";

type LinkOrButtonProps =
  | { href: string; onClick?: never }
  | { href?: never; onClick: React.MouseEventHandler<HTMLButtonElement> };
type TopNavItemProps = { icon: Icon; title?: string } & LinkOrButtonProps;

function TopNavButton({ href, onClick, icon: Icon, title }: TopNavItemProps) {
  const classes = clsx(
    "text-neutral-600 dark:text-neutral-400 rounded p-1.5 transition leading-none",
    "hover:text-neutral-900 dark:hover:text-neutral-100", // styling for mobile
    "sm:hover:bg-indigo-100 sm:dark:hover:bg-indigo-800 sm:dark:hover:bg-opacity-50 sm:hover:text-primary" // styling for desktop
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
}

function TopNavExpandedItem({
  href,
  onClick,
  icon: Icon,
  children,
}: React.PropsWithChildren<TopNavItemProps>) {
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
}

function BreadCrumbSlash() {
  return (
    <svg width={12} height={36}>
      <line x1="12" y1="0" x2="0" y2="36" className="stroke-neutral-500" />
    </svg>
  );
}

function TopNavBreadcrumb({ type, siteName, pageId }: CurrentPage) {
  return (
    <div className="flex flex-row gap-3 items-center">
      <A href="/app/dashboard" notStyled>
        <Logo size={36} />
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
}

function TopNavMobileBreadcrumb({ type, siteName, pageId }: CurrentPage) {
  return (
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
}

export default function TopNav(props: CurrentPage) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { setLoading } = useLoadingState();
  const setToast = useSetToast();
  const [showNotif, setShowNotif] = useState(false);
  const { notifications } = useNotifications();

  useEffect(() => setExpanded(false), [pathname]);

  const bellDotClass = clsx(
    notifications &&
      notifications.length > 0 &&
      "relative after:absolute after:-top-0.5 after:-right-0.5 after:bg-indigo-500 after:rounded-full after:w-3 after:h-3"
  );

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setLoading(true);
    try {
      await signOut(router.refresh);
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
      setLoading(false);
    }
  };
  const handleNotif: React.MouseEventHandler<HTMLButtonElement> = () => setShowNotif(true);

  return (
    <>
      <div className="container px-5 sm:px-6">
        <nav className="hidden sm:flex flex-row gap-6 pt-3 sm:pt-6 items-center justify-between">
          <TopNavBreadcrumb {...props} />
          <div className="flex-grow" />
          <TopNavButton
            onClick={handleNotif}
            icon={() => (
              <span className={bellDotClass}>
                <Bell className="inline-block" />
              </span>
            )}
            title="Notifications"
          />
          <TopNavButton onClick={handleLogout} icon={LogOut} title="Sign out" />
          <A
            href="/app/account"
            className="rounded-full border border-indigo-500 dark:border-indigo-400 h-9 w-9 shrink-0 relative overflow-hidden"
            title="View account settings"
          >
            {user.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.photoURL} alt="avatar" className="w-9 h-9" />
            ) : (
              <DefaultPhoto size={34} /> // don't ask me why it's 34px, Firefox told me so
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
            <TopNavButton icon={expanded ? X : Menu} onClick={() => setExpanded(!expanded)} />
            <TopNavMobileBreadcrumb {...props} />
            <TopNavButton
              onClick={handleNotif}
              icon={() => (
                <span className={bellDotClass}>
                  <Bell className="inline-block" />
                </span>
              )}
            />
          </nav>
          <nav
            className={clsx(
              "flex flex-col transition-all",
              expanded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            )}
          >
            <TopNavExpandedItem icon={Home} href="/app/dashboard">
              Dashboard
            </TopNavExpandedItem>
            <TopNavExpandedItem icon={Settings} href="/app/account">
              Account settings
            </TopNavExpandedItem>
            <TopNavExpandedItem icon={LogOut} onClick={handleLogout}>
              Log out
            </TopNavExpandedItem>
            <div className="flex flex-row justify-between items-center mx-1 mt-6">
              <LogoText />
            </div>
          </nav>
        </div>
      </div>
      <Notifications show={showNotif} onClose={() => setShowNotif(false)} />
    </>
  );
}
