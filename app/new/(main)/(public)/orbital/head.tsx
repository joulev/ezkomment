import getOgImage from "~/client/lib/getOgImage";
import Seo from "~/client13/components/seo";

import { SeoProps } from "~/types/client/components.type";

const seo: SeoProps = {
  title: "Orbital | ezkomment",
  description:
    "ezkomment is an NUS Orbital project. This page includes all public information of ezkomment that is related to NUS Orbital 2022.",
  image: getOgImage({ title: "ezkomment @ NUS Orbital", label: "orbital" }),
  url: "https://ezkomment.joulev.dev/orbital",
};

export default function OrbitalHead() {
  return <Seo {...seo} />;
}
