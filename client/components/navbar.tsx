import clsx from "clsx";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import useBreakpoint from "~/client/hooks/breakpoint";

import Button from "~/client/components/buttons";

import logoText from "~/public/images/logo-text.svg";

import A from "./anchor";

const scrollThreshold = 300;

const PublicNavbar: FC = () => {
  const breakpoint = useBreakpoint();

  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => setScrollY(window.scrollY);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed z-40 top-0 inset-x-0 bg-card border-card",
        scrollY > scrollThreshold && "border-b"
      )}
    >
      <div
        className={clsx(
          scrollY > scrollThreshold ? "h-18" : "h-0",
          "container flex flex-row justify-between items-center transition-all overflow-hidden"
        )}
      >
        <A className="logo-width" href="/">
          <Image src={logoText} alt="logo" />
        </A>
        <Button
          variant={breakpoint === "xs" ? "tertiary" : "primary"}
          href="/auth"
          icon={breakpoint === "xs" ? LoginOutlinedIcon : undefined}
        >
          {breakpoint === "xs" ? undefined : "Get started"}
        </Button>
      </div>
    </nav>
  );
};

export default PublicNavbar;
