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
        "p-3 transition hover:text-gray-900 whitespace-nowrap",
        active ? "text-gray-900" : "text-gray-500",
        active &&
          "relative after:absolute after:bottom-0 after:inset-x-3 after:h-0 after:border-b-2 after:border-gray-900",
        className
      )}
    >
      {children}
    </A>
  );
};

const MainNav: FC = () => (
  <div className="sm:container overflow-auto no-scrollbar">
    {/* inline-block to make sure right padding is counted, https://stackoverflow.com/a/10055203 */}
    {/* F*ck CSS */}
    <div className="pt-0 sm:pt-3 px-6 sm:px-0 inline-block">
      <nav className="flex flex-row -mx-3">
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
      </nav>
    </div>
  </div>
);

export default MainNav;
