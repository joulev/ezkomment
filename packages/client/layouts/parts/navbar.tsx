import Image from "next/image";
import type { FC } from "react";
import clsx from "clsx";

const Navbar: FC = () => (
  <header className="bg-white border-b border-gray-300">
    <nav className="container flex flex-row gap-6 py-2 items-center">
      <div
        className={clsx(
          "w-10 h-10 shrink-0 relative",
          "after:absolute after:-right-3 after:w-0 after:h-10",
          "after:border-l after:border-gray-300"
        )}
      >
        <Image src="/logo.svg" alt="ezkomment" layout="fill" />
      </div>
      <div className="text-xl">Overview</div>
      <div className="flex-grow" />
      <div>All sites</div>
      <div>Notifications</div>
      <div>Me</div>
    </nav>
  </header>
);

export default Navbar;
