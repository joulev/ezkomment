import { NextSeo } from "next-seo";
import { FC } from "react";

import { SeoProps } from "~/old/types/client/components.type";

const Seo: FC<SeoProps> = ({ title, description, image, url }) => (
  <NextSeo
    title={title}
    description={description}
    canonical={url}
    openGraph={{
      url,
      title,
      description,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    }}
    twitter={{
      cardType: "summary_large_image",
      handle: "@joulev_3",
    }}
    additionalLinkTags={[
      { rel: "icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "152x152" },
    ]}
  />
);

export default Seo;
