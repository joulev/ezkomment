import clsx from "clsx";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import { useScreenWidth } from "@client/context/screenWidth";

import Button from "@client/components/buttons";

import logoText from "@client/public/images/logo-text.svg";

const scrollThreshold = 300;

const HomeNavbar: FC = () => {
  const screenWidth = useScreenWidth();
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => setScrollY(window.scrollY);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx("fixed z-40 top-0 inset-x-0 px-6 sm:px-10", "bg-card border-b border-card")}
    >
      <div
        className={clsx(
          scrollY > scrollThreshold ? "h-[72px]" : "h-0",
          "mx-auto w-full lg:w-5/6 xl:w-4/5 flex flex-row justify-between items-center transition-all overflow-hidden"
        )}
      >
        <button
          className="w-[calc(397px*0.4)]"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Image src={logoText} alt="logo" layout="responsive" width={397} height={80} />
        </button>
        <div className="flex flex-row gap-6">
          <Button variant="tertiary" href="/app/auth/signin" className="hidden sm:block">
            Sign in
          </Button>
          <Button
            variant={screenWidth === "xs" ? "tertiary" : "primary"}
            href="/app/auth/signup"
            icon={screenWidth === "xs" ? LoginOutlinedIcon : undefined}
          >
            {screenWidth === "xs" ? undefined : "Get started"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
