import clsx from "clsx";
import { FC } from "react";

import { CurrentPage } from "@client/types/page.type";

import MainNav from "./main";
import TopNav from "./top";

const Navbar: FC<CurrentPage> = props => (
  <header
    className={clsx(
      "bg-white dark:bg-black border-b border-neutral-300 dark:border-neutral-700",
      "sticky -top-14 sm:top-[-68px] z-10"
    )}
  >
    <TopNav {...props} />
    <MainNav {...props} />
  </header>
);

export default Navbar;
