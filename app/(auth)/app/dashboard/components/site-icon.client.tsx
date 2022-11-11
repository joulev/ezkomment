"use client";

import { Img } from "react-image";
import { Site } from "~/types/server";

export type Props = React.ComponentProps<"img"> & {
  site: Site;
  src?: never;
};

export default function SiteIcon({ site, ...rest }: Props) {
  return (
    <Img
      {...rest}
      src={[
        site.iconURL || "",
        site.domain === "*" ? "" : `https://${site.domain}/apple-touch-icon.png`,
        site.domain === "*" ? "" : `https://${site.domain}/images/apple-touch-icon.png`,
        site.domain === "*" ? "" : `https://${site.domain}/img/apple-touch-icon.png`,
        site.domain === "*" ? "" : `http://${site.domain}/apple-touch-icon.png`,
        site.domain === "*" ? "" : `http://${site.domain}/images/apple-touch-icon.png`,
        site.domain === "*" ? "" : `http://${site.domain}/img/apple-touch-icon.png`,
        "/images/logo.svg",
      ]}
    />
    // <img src={site.iconURL || "/images/logo.svg"} {...rest} />
  );
}
