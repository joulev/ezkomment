import clsx from "clsx";
import Image from "next/image";
import { FC } from "react";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";

import version from "~/client/lib/version";

import A from "~/client/components/anchor";
import ModeSwitcher from "~/client/components/modeSwitcher";

import { FooterProps } from "~/types/client/components.type";
import { IconType } from "~/types/client/utils.type";

import logoText from "~/public/images/logo-text.svg";

type SocialIconLinkProps = { href: string; icon: IconType };
const SocialIconLink: FC<SocialIconLinkProps> = ({ href, icon: Icon }) => (
  <A
    href={href}
    notStyled
    className="transition text-muted hover:text-neutral-900 dark:hover:text-neutral-100"
  >
    <Icon />
  </A>
);

const FooterNavLink: FC<{ href: string; title: string }> = ({ href, title }) => (
  <A
    href={href}
    notStyled
    className="transition font-semibold text-muted hover:text-neutral-900 dark:hover:text-neutral-100"
  >
    {title}
  </A>
);

const Footer: FC<FooterProps> = ({ className, containerClasses = "container" }) => (
  <footer
    className={clsx("bg-card border-t border-card py-6 absolute bottom-0 inset-x-0", className)}
  >
    <div
      className={clsx(
        "flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center",
        containerClasses
      )}
    >
      <div className="min-w-[50%] sm:max-w-[66%] flex flex-col">
        <A href="/" notStyled className="block logo-width mb-3">
          <Image src={logoText} alt="ezkomment" layout="responsive" />
        </A>
        <div className="flex flex-row flex-wrap gap-x-6 mb-6">
          <FooterNavLink href="/" title="Homepage" />
          <FooterNavLink href="/app/dashboard" title="Dashboard" />
          <FooterNavLink href="/docs" title="Docs" />
          <FooterNavLink href="/orbital" title="Orbital" />
        </div>
        <div className="text-sm text-muted">
          ezkomment <A href={version.href}>{version.version}</A>
        </div>
      </div>
      <hr className="my-6 border-card sm:hidden" />
      <div className="flex flex-row gap-6 justify-between items-center sm:justify-start sm:flex-col sm:items-end">
        <div className="flex flex-row gap-3">
          <SocialIconLink href="https://github.com/joulev/ezkomment" icon={GitHubIcon} />
          <SocialIconLink href="https://t.me/joulev3" icon={TelegramIcon} />
          <SocialIconLink href="mailto:joulev.vvd@yahoo.com" icon={EmailOutlinedIcon} />
        </div>
        <ModeSwitcher />
      </div>
    </div>
  </footer>
);

export default Footer;
