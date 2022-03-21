import clsx from "clsx";
import Image from "next/image";
import { FC, useEffect } from "react";
import { useContext, useState } from "react";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import A from "@client/components/anchor";
import ModeContext from "@client/context/mode";
import type { Mode } from "@client/types/utils.type";

type SocialIconLinkProps = { href: string; icon: typeof EmailOutlinedIcon };
const SocialIconLink: FC<SocialIconLinkProps> = ({ href, icon: Icon }) => (
  <A
    href={href}
    notStyled
    className={clsx(
      "transition text-neutral-500 hover:text-neutral-900",
      "dark:hover:text-neutral-100"
    )}
  >
    <Icon fontSize="inherit" className="text-2xl" />
  </A>
);

const ModeSwitcher: FC = () => {
  const modeContext = useContext(ModeContext);
  const mode = modeContext?.mode;
  const setMode = modeContext?.setMode;
  const modes = [
    { value: "light", icon: LightModeOutlinedIcon },
    { value: "dark", icon: DarkModeOutlinedIcon },
    { value: "system", icon: ComputerOutlinedIcon },
  ];
  return (
    <div className="flex flex-row items-center">
      {modes.map(({ value, icon: Icon }, index) => (
        <button
          key={index}
          className={clsx(
            "px-2 py-1 border-l border-y",
            value === mode
              ? "bg-indigo-500 border-indigo-500 text-white"
              : "transition border-neutral-300 dark:border-neutral-700 text-neutral-500 " +
                  "hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800",
            index === 0 && "rounded-l",
            index === 2 && "border-r rounded-r"
          )}
          onClick={() => (setMode ? setMode(value as Mode) : null)}
          title={value + " mode"}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
};

const Footer: FC = () => {
  // Don't even know if this is guaranteed to always work as Next.js don't document this.
  const [buildId, setBuildId] = useState("unknown");
  useEffect(() => {
    const getBuildId: string = JSON.parse(
      document.querySelector("#__NEXT_DATA__")?.textContent as string
    ).buildId;
    setBuildId(getBuildId);
  }, []);
  return (
    <footer className="bg-white dark:bg-black border-t border-neutral-300 dark:border-neutral-700 py-6">
      <div className="container flex flex-col-reverse sm:flex-row sm:justify-between">
        <div className="sm:max-w-[66%]">
          <Image src="/logo-text.svg" alt="ezkomment" width={397 / 2.5} height={80 / 2.5} />
          <div className="text-sm">
            This project is made possible by [Insert Technology Name Here]
          </div>
          <hr className="my-6 border-neutral-300 dark:border-neutral-700" />
          <div className="text-sm text-neutral-500">Version {buildId}</div>
        </div>
        <hr className="my-6 border-neutral-300 dark:border-neutral-700 sm:hidden" />
        <div className="flex flex-row gap-6 justify-between sm:justify-start sm:flex-col sm:items-end">
          <div className="flex flex-row gap-3">
            <SocialIconLink href="#" icon={GitHubIcon} />
            <SocialIconLink href="#" icon={TelegramIcon} />
            <SocialIconLink href="#" icon={EmailOutlinedIcon} />
          </div>
          <ModeSwitcher />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
