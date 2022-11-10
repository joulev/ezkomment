import { FC } from "react";

import { CurrentPage } from "~/old/types/client/page.type";

import MainNav from "./main";
import TopNav from "./top";

const Navbar: FC<CurrentPage> = props => (
  <header className="bg-card border-b border-card sticky -top-14 sm:top-[-72px] z-10">
    <TopNav {...props} />
    <MainNav {...props} />
  </header>
);

export default Navbar;
