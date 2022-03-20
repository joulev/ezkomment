import clsx from "clsx";
import Image from "next/image";
import type { FC } from "react";
import { useContext } from "react";
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
  <A href={href} notStyled className="text-gray-500 hover:text-gray-900 transition">
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
    <div className="flex flex-row gap-3 items-center">
      <span className="text-gray-500">Change mode:</span>
      <div className="flex flex-row items-center">
        {modes.map(({ value, icon: Icon }, index) => (
          <button
            key={index}
            className={clsx(
              "px-2 py-1 border-l border-y",
              value === mode
                ? "bg-indigo-500 border-indigo-500 text-white"
                : "transition border-gray-300 text-gray-500 hover:text-gray-900 hover:bg-gray-200",
              index === 0 && "rounded-l",
              index === 2 && "border-r rounded-r"
            )}
            onClick={() => (setMode ? setMode(value as Mode) : null)}
          >
            <Icon />
          </button>
        ))}
      </div>
    </div>
  );
};

const Footer: FC = () => (
  <footer className="bg-white border-t border-gray-300 py-6">
    <div className="container flex flex-col-reverse sm:flex-row sm:justify-between">
      <div className="sm:max-w-[66%]">
        <Image src="/logo-text.svg" alt="ezkomment" width={397 / 2.5} height={80 / 2.5} />
        <div className="text-sm">
          This project is made possible by [Insert Technology Name Here]
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="text-sm text-gray-500">Version a1b2c3d, last updated on 2022/03/21.</div>
      </div>
      <hr className="my-6 border-gray-300 sm:hidden" />
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

export default Footer;
