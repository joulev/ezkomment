import Seo, { Props } from "~/client13/components/seo";

const seo: Props = {
  title: "Orbital | ezkomment",
  description:
    "ezkomment is an NUS Orbital project. This page includes all public information of ezkomment that is related to NUS Orbital 2022.",
  og: { title: "ezkomment @ NUS Orbital", label: "orbital" },
  url: "https://ezkomment.joulev.dev/orbital",
};

export default function OrbitalHead() {
  return <Seo {...seo} />;
}
