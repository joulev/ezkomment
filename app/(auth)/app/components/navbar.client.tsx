"use client";

import MainNav from "./navbar-main.client";
import TopNav from "./navbar-top.client";
import { NavbarProps } from "./navbar.type";

export default function Navbar(props: NavbarProps) {
  return (
    <header className="bg-card border-b border-card sticky -top-14 sm:top-[-72px] z-10">
      <TopNav {...props} />
      <MainNav {...props} />
    </header>
  );
}
