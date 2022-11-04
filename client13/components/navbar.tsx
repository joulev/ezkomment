"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import useBreakpoint from "~/client/hooks/breakpoint";
import A from "~/client13/components/anchor";
import Button from "~/client13/components/buttons";
import logoText from "~/public/images/logo-text.svg";

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
        <A className="logo-width" href="/">
          <Image src={logoText} alt="logo" />
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
