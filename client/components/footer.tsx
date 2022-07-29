import clsx from "clsx";
import Image from "next/image";
import { FC, useState } from "react";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";

import version from "~/client/lib/version";

import A from "~/client/components/anchor";
import Button from "~/client/components/buttons";
import Modal from "~/client/components/modal";
import ModeSwitcher from "~/client/components/modeSwitcher";
import RightAligned from "~/client/components/utils/rightAligned";

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

const Footer: FC<FooterProps> = ({ className, containerClasses = "container" }) => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const decline = () => {
    setShowPrivacyModal(false);
    localStorage.setItem("privacy-consent", "declined");
  };
  const accept = () => {
    setShowPrivacyModal(false);
    localStorage.setItem("privacy-consent", "accepted");
  };
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
          <A href="/" notStyled className="block logo-width mb-3">
            <Image src={logoText} alt="ezkomment" layout="responsive" />
          </A>
          <div className="flex flex-row flex-wrap gap-x-6 mb-6">
            <FooterNavLink href="/" title="Homepage" />
            <FooterNavLink href="/app/dashboard" title="Dashboard" />
            <FooterNavLink href="/docs" title="Docs" />
            <FooterNavLink href="/orbital" title="Orbital" />
          </div>
          <div className="text-sm text-muted flex flex-row">
            <div className="mr-3 after:content-['•'] after:ml-3">
              ezkomment <A href={version.href}>{version.version}</A>
            </div>
            <A onClick={() => setShowPrivacyModal(true)} className="text-muted hover:text-muted">
              Privacy
            </A>
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
      <Modal isVisible={showPrivacyModal} onOutsideClick={() => setShowPrivacyModal(false)}>
        <div className="p-6 max-w-2xl text-sm sm:text-base">
          <h2>Privacy</h2>
          <p>
            We do <strong>not</strong> use cookies in any way in this app and in the embeded comment
            sections.
          </p>
          <p>
            We make use of a <A href="https://firebase.google.com">Firebase</A> project with Google
            Analytics turned off. We also never store any of your data permanently: on
            page/site/account deletion, all data associated to it will be forever deleted. However,
            Firebase may collect some metadata behind the scenes, which we cannot control and we do
            not make use of.
          </p>
          <p>
            We <strong>do</strong> collect web vitals and other metrics, including your IP address,
            your user agent and your approximate geolocation (accurate to the city level). It is not
            traceable to you, and we also do not share this data with anyone. The data helps us
            enhance and make improvements to our product, however if you do not want to share this
            information, you can always decline by clicking the button below.
          </p>
          <p>You can go here to update your preferences at any time.</p>
          <RightAligned className="gap-6">
            <Button variant="tertiary" onClick={decline}>
              Decline
            </Button>
            <Button onClick={accept}>Accept</Button>
          </RightAligned>
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;
