import MainNav from "./main.client";
import TopNav from "./top.client";
import { CurrentPage } from "~/old/types/client/page.type";

export default function Navbar(props: CurrentPage) {
  return (
    <header className="bg-card border-b border-card sticky -top-14 sm:top-[-72px] z-10">
      <TopNav {...props} />
      <MainNav {...props} />
    </header>
  );
}
