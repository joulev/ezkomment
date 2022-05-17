import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import useBreakpoint from "@client/hooks/breakpoint";

import Button from "@client/components/buttons";

import logoText from "@client/public/images/logo-text.svg";

import A from "../anchor";

const scrollThreshold = 300;

const HomeNavbar: FC = () => {
  const breakpoint = useBreakpoint();
  const router = useRouter();

  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => setScrollY(window.scrollY);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed z-40 top-0 inset-x-0 px-6 sm:px-10 bg-card border-b border-card print:hidden">
      <div
        className={clsx(
          scrollY > scrollThreshold ? "h-[72px]" : "h-0",
          "mx-auto w-full lg:w-5/6 xl:w-4/5 flex flex-row justify-between items-center transition-all overflow-hidden"
        )}
      >
        <A
          className="w-[calc(397px*0.4)]"
          href={router.pathname === "/" ? undefined : "/"}
          onClick={() => router.pathname === "/" && window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Image src={logoText} alt="logo" layout="responsive" width={397} height={80} />
        </A>
        <div className="flex flex-row gap-6">
          <Button variant="tertiary" href="/auth/signin" className="hidden sm:block">
            Sign in
          </Button>
          <Button
            variant={breakpoint === "xs" ? "tertiary" : "primary"}
            href="/auth/signup"
            icon={breakpoint === "xs" ? LoginOutlinedIcon : undefined}
          >
            {breakpoint === "xs" ? undefined : "Get started"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
