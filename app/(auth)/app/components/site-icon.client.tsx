"use client";

import { useState, useEffect } from "react";
import { internalPost } from "~/app/(auth)/internal-fetch";
import Logo from "~/app/components/logo/logo";

export type Props = {
  iconURL: string | null;
  domain: string;
  size?: number;
};

export default function SiteIcon({ iconURL, domain, size = 48 }: Props) {
  const [url, setUrl] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (iconURL) setUrl(iconURL);
    if (domain === "*") setUrl("none");
    else {
      (async () => {
        const { success, body } = await internalPost("/api/sites/icon-url", { domain });
        if (success) setUrl((body as { url: string }).url);
        else setUrl("none");
      })();
    }
  }, [iconURL, domain]);
  if (!url) return <div className="shrink-0 rounded pulse" style={{ width: size, height: size }} />;
  if (url === "none") return <Logo size={size} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} alt="" className="shrink-0 rounded" style={{ width: size, height: size }} />
  );
}
