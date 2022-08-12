import { FC } from "react";
import { useImage } from "react-image";

import { SiteIconProps } from "~/types/client/components.type";
import { Site } from "~/types/server";

function useSiteIconURL(site: Site) {
  const { src } = useImage({
    srcList: [
      site.iconURL || "",
      site.domain === "*" ? "" : `https://${site.domain}/apple-touch-icon.png`,
      site.domain === "*" ? "" : `https://${site.domain}/images/apple-touch-icon.png`,
      site.domain === "*" ? "" : `https://${site.domain}/img/apple-touch-icon.png`,
      site.domain === "*" ? "" : `http://${site.domain}/apple-touch-icon.png`,
      site.domain === "*" ? "" : `http://${site.domain}/images/apple-touch-icon.png`,
      site.domain === "*" ? "" : `http://${site.domain}/img/apple-touch-icon.png`,
      "/images/logo.svg",
    ],
  });
  return src;
}

const SiteIcon: FC<SiteIconProps> = ({ site, ...rest }) => {
  const iconURL = useSiteIconURL(site);
  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img {...rest} src={iconURL} />
  );
};

export default SiteIcon;
