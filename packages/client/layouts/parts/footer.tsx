import format from "date-fns/format";
import Image from "next/image";
import type { FC } from "react";
import { useEffect, useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import A from "@client/components/anchor";
import ModeSwitcher from "@client/layouts/parts/shared/modeSwitcher";

type BuildInfo = { hash: string; shortHash: string; timestamp: string };
function processBuildId(buildId: string): BuildInfo {
  if (process.env.NODE_ENV === "development") return { hash: "", shortHash: "", timestamp: "" };
  const [hash, timestamp] = buildId.split("@");
  return {
    hash,
    shortHash: hash.substring(0, 7),
    timestamp,
  };
}

type SocialIconLinkProps = { href: string; icon: typeof EmailOutlinedIcon };
const SocialIconLink: FC<SocialIconLinkProps> = ({ href, icon: Icon }) => (
  <A
    href={href}
    notStyled
    className="transition text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
  >
    <Icon />
  </A>
);

const Footer: FC = () => {
  // Don't even know if this is guaranteed to always work as Next.js don't document this.
  const [buildId, setBuildId] = useState<BuildInfo | null>(null);
  useEffect(() => {
    const getBuildId: string = JSON.parse(
      document.querySelector("#__NEXT_DATA__")?.textContent as string
    ).buildId;
    setBuildId(processBuildId(getBuildId));
  }, []);
  return (
    <footer className="bg-white dark:bg-black border-t border-neutral-300 dark:border-neutral-700 py-6">
      <div className="container flex flex-col-reverse sm:flex-row sm:justify-between">
        <div className="min-w-[50%] sm:max-w-[66%]">
          <Image src="/images/logo-text.svg" alt="ezkomment" width={397 / 2.5} height={80 / 2.5} />
          <div className="mt-3 text-sm text-neutral-500">
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
                  {buildId.shortHash}
                </A>{" "}
                at{" "}
                <time title={buildId.timestamp}>
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
