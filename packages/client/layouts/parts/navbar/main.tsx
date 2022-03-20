import clsx from "clsx";
import type { FC } from "react";
import A from "@client/components/anchor";

type MainNavButtonProps = { href: string; active?: boolean; className?: string };
const MainNavButton: FC<MainNavButtonProps> = ({ href, active, className, children }) => {
  return (
    <A
      href={href}
      notStyled
      className={clsx(
        "transition hover:text-gray-900 whitespace-nowrap",
        active ? "text-gray-900" : "text-gray-500",
        active &&
          "relative after:absolute after:-bottom-[9px] after:inset-x-0 after:h-0 after:border-b-2 after:border-gray-900",
        className
      )}
    >
      {children}
    </A>
  );
};

const MainNav: FC = () => (
  <div className="container">
    <nav className="max-w-full">
      <div className="flex flex-row gap-6 pb-2">
        <MainNavButton href="/" active>
          All pages
        </MainNavButton>
        <MainNavButton href="/" className="sm:hidden">
          Pending
        </MainNavButton>
        <MainNavButton href="/" className="hidden sm:block">
          Pending comments
        </MainNavButton>
        <MainNavButton href="/" className="sm:hidden">
          Customise
        </MainNavButton>
        <MainNavButton href="/" className="hidden sm:block">
          Customise display
        </MainNavButton>
        <MainNavButton href="/">Settings</MainNavButton>
      </div>
    </nav>
  </div>
);

export default MainNav;
