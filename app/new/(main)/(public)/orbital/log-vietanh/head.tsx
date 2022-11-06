import getOgImage from "~/client/lib/getOgImage";
import Seo from "~/client13/components/seo";

import { SeoProps } from "~/types/client/components.type";

const seo: SeoProps = {
  title: "Project Log for Nguyen Viet Anh | ezkomment",
  description: "Project Log for Nguyen Viet Anh during the 2022 NUS Orbital Program",
  url: "https://ezkomment.joulev.dev/orbital/log-vietanh",
  image: getOgImage({ title: "Project Log for Nguyen Viet Anh", label: "orbital" }),
};

export default function OrbitalLogVietanhHead() {
  return <Seo {...seo} />;
}
