import Image from "next/image";
import type { FC } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import A from "@client/components/anchor";

type SocialIconLinkProps = { href: string; icon: typeof EmailOutlinedIcon };
const SocialIconLink: FC<SocialIconLinkProps> = ({ href, icon: Icon }) => (
  <A href={href} notStyled className="text-gray-500 hover:text-gray-900 transition">
    <Icon fontSize="inherit" className="text-2xl" />
  </A>
);

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
      <div className="flex flex-row gap-3 justify-between sm:justify-start sm:flex-col sm:items-end">
        <div className="flex flex-row gap-3">
          <SocialIconLink href="#" icon={GitHubIcon} />
          <SocialIconLink href="#" icon={TelegramIcon} />
          <SocialIconLink href="#" icon={EmailOutlinedIcon} />
        </div>
        <div>Change dark mode</div>
      </div>
    </div>
  </footer>
);

export default Footer;
