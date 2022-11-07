"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import useBreakpoint from "~/client13/hooks/breakpoint";
import A from "~/client13/components/anchor.client";
import Button from "~/client13/components/buttons.client";
import LogoText from "~/client13/components/logo/logoText";

const scrollThreshold = 300;

export default function PublicNavbar() {
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
        <A href="/">
          <LogoText />
        </A>
        <Button
          variant={breakpoint === "xs" ? "tertiary" : "primary"}
          href="/auth"
          icon={breakpoint === "xs" ? LogIn : undefined}
        >
          {breakpoint === "xs" ? undefined : "Get started"}
        </Button>
      </div>
    </nav>
  );
}
