import { NextSeo } from "next-seo";
import { FC } from "react";

import { SeoProps } from "@client/types/components.type";

const Seo: FC<SeoProps> = ({ title, description, image, url }) => (
  <NextSeo
    title={title}
    description={description}
    canonical={url}
    openGraph={{
      url,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    }}
  />
);

export default Seo;
