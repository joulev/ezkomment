import clsx from "clsx";
import { Github, Send as Telegram, Mail, Icon } from "lucide-react";
import version from "~/client/lib/version";
import A from "~/client13/components/anchor.client";
import LogoText from "~/client13/components/logo/logoText";
import PrivacyModal from "./privacyModal.client";

function SocialIconLink({ href, icon: Icon }: { href: string; icon: Icon }) {
  return (
    <A
      href={href}
      notStyled
      className="transition text-muted hover:text-neutral-900 dark:hover:text-neutral-100"
    >
      <Icon />
    </A>
  );
}

function FooterNavLink({ href, title }: { href: string; title: string }) {
  return (
    <A
      href={href}
      notStyled
      className="transition font-semibold text-muted hover:text-neutral-900 dark:hover:text-neutral-100"
    >
      {title}
    </A>
  );
}

export type Props = {
  className?: string;
  containerClasses?: string;
};

export default function Footer({ className, containerClasses = "container" }: Props) {
  return (
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
          <div className="mb-3">
            <A href="/" notStyled className="mb-3">
              <LogoText />
            </A>
          </div>
          <div className="flex flex-row flex-wrap gap-x-6 mb-6">
            <FooterNavLink href="/" title="Homepage" />
            <FooterNavLink href="/app/dashboard" title="Dashboard" />
            <FooterNavLink href="https://demo.ezkomment.joulev.dev" title="Demo" />
            <FooterNavLink href="/docs" title="Docs" />
            <FooterNavLink href="/orbital" title="Orbital" />
          </div>
          <div className="text-sm text-muted flex flex-row">
            <div className="mr-3 after:content-['•'] after:ml-3">
              ezkomment <A href={version.href}>{version.version}</A>
            </div>
            <PrivacyModal />
          </div>
        </div>
        <hr className="my-6 border-card sm:hidden" />
        <div className="flex flex-row gap-6 justify-between items-center sm:justify-start sm:flex-col sm:items-end">
          <div className="flex flex-row gap-3">
            <SocialIconLink href="https://github.com/joulev/ezkomment" icon={Github} />
            <SocialIconLink href="https://t.me/joulev3" icon={Telegram} />
            <SocialIconLink href="mailto:joulev.vvd@yahoo.com" icon={Mail} />
          </div>
        </div>
      </div>
    </footer>
  );
}
