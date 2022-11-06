import getOgImage from "~/client/lib/getOgImage";
import Seo from "~/client13/components/seo";

import { SeoProps } from "~/types/client/components.type";

const seo: SeoProps = {
  title: "Project Log for Vu Van Dung | ezkomment",
  description: "Project Log for Vu Van Dung during the 2022 NUS Orbital Program",
  url: "https://ezkomment.joulev.dev/orbital/log-joulev",
  image: getOgImage({ title: "Project Log for Vu Van Dung", label: "orbital" }),
};

export default function OrbitalLogJoulevHead() {
  return <Seo {...seo} />;
}
