import clsx from "clsx";
import Image from "next/image";
import { Github, Send as Telegram, Mail, LucideProps } from "lucide-react";
import version from "~/client/lib/version";
import A from "~/client13/components/anchor";
import { FooterProps } from "~/types/client/components.type";
import logoText from "~/client13/assets/logo-text.svg";
import PrivacyModal from "./privacyModal.client";

function SocialIconLink({ href, icon: Icon }: { href: string; icon: React.FC<LucideProps> }) {
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

export default function Footer({ className, containerClasses = "container" }: FooterProps) {
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
          <A href="/new/" notStyled className="block logo-width mb-3">
            <Image src={logoText} alt="ezkomment" />
          </A>
          <div className="flex flex-row flex-wrap gap-x-6 mb-6">
            <FooterNavLink href="/new/" title="Homepage" />
            <FooterNavLink href="/new/app/dashboard" title="Dashboard" />
            <FooterNavLink href="https://demo.ezkomment.joulev.dev" title="Demo" />
            <FooterNavLink href="/new/docs" title="Docs" />
            <FooterNavLink href="/new/orbital" title="Orbital" />
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
