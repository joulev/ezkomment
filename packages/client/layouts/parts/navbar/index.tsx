import type { FC } from "react";
import MainNav from "./main";
import TopNav from "./top";

const Navbar: FC = () => (
  <header className="bg-white border-b border-gray-300">
    <TopNav />
    <MainNav />
  </header>
);

export default Navbar;
