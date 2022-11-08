import Seo, { Props } from "~/app/components/seo";

const seo: Props = {
  title: "Project Log for Vu Van Dung | ezkomment",
  description: "Project Log for Vu Van Dung during the 2022 NUS Orbital Program",
  url: "https://ezkomment.joulev.dev/orbital/log-joulev",
  og: { title: "Project Log for Vu Van Dung", label: "orbital" },
};

export default function OrbitalLogJoulevHead() {
  return <Seo {...seo} />;
}
