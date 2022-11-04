import getOgImage from "~/client/lib/getOgImage";
import Seo from "~/client13/components/seo";

import { SeoProps } from "~/types/client/components.type";

const seo: SeoProps = {
  title: "ezkomment: Commenting made easy",
  description:
    "No complicated backend configuration. Add a comment section anywhere – even if you use plain HTML, we got you covered.",
  image: getOgImage({}),
  url: "https://ezkomment.joulev.dev",
};

export default function Head() {
  return <Seo {...seo} />;
}
