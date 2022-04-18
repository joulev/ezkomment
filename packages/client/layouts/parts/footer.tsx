import clsx from "clsx";
import { format, formatISO } from "date-fns";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";

import parseBuildId from "@client/lib/parseBuildId";

import A from "@client/components/anchor";
import ModeSwitcher from "@client/components/modeSwitcher";

import { BuildInfo, IconType } from "@client/types/utils.type";

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

const Footer: FC<{ className?: string; containerClasses?: string }> = ({
  className,
  containerClasses = "container",
}) => {
  // Don't even know if this is guaranteed to always work as Next.js don't document this.
  const [buildId, setBuildId] = useState<BuildInfo | null>(null);
  useEffect(() => {
    const getBuildId: string = JSON.parse(
      document.querySelector("#__NEXT_DATA__")?.textContent as string
    ).buildId;
    setBuildId(parseBuildId(getBuildId));
  }, []);
  return (
    <footer
      className={clsx(
        "bg-card border-t border-neutral-300 dark:border-neutral-700 py-6",
        className
      )}
    >
      <div
        className={clsx(
          "flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center",
          containerClasses
        )}
      >
        <div className="min-w-[50%] sm:max-w-[66%]">
          <A href="/">
            <Image
              src="/images/logo-text.svg"
              alt="ezkomment"
              width={397 / 2.5}
              height={80 / 2.5}
            />
          </A>
          <div className="mt-3 text-sm text-muted">
            {process.env.NODE_ENV === "development" && <>Development build</>}
            {process.env.NODE_ENV === "production" && !buildId && (
              <>Retrieving build information&hellip;</>
            )}
            {process.env.NODE_ENV === "production" && buildId && (
              <>
                Commit{" "}
                <A
                  href={`https://github.com/joulev/ezkomment/commit/${buildId.hash}`}
                  className="font-mono"
                >
                  {buildId.hash}
                </A>{" "}
                at{" "}
                <time title={formatISO(buildId.timestamp)}>
                  {format(new Date(buildId.timestamp), "HH:mm dd/MM/yyyy")}
                </time>
              </>
            )}
          </div>
        </div>
        <hr className="my-6 border-neutral-300 dark:border-neutral-700 sm:hidden" />
        <div className="flex flex-row gap-6 justify-between items-center sm:justify-start sm:flex-col sm:items-end">
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
