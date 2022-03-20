import clsx from "clsx";
import type { FC } from "react";
import MainNav from "./main";
import TopNav from "./top";

const Navbar: FC = () => (
  <header
    className={clsx(
      "bg-white dark:bg-black border-b border-neutral-300 dark:border-neutral-700",
      "sticky -top-14 sm:top-[-68px]"
    )}
  >
    <TopNav />
    <MainNav />
  </header>
);

export default Navbar;
