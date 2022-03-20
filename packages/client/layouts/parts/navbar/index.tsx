import type { FC } from "react";
import MainNav from "./main";
import TopNav from "./top";

const Navbar: FC = () => (
  <header className="bg-white border-b border-gray-300 sticky -top-14 sm:top-[-68px]">
    <TopNav />
    <MainNav />
  </header>
);

export default Navbar;
