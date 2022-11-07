import Seo, { Props } from "~/client13/components/seo";

const seo: Props = {
  title: "Project Log for Nguyen Viet Anh | ezkomment",
  description: "Project Log for Nguyen Viet Anh during the 2022 NUS Orbital Program",
  url: "https://ezkomment.joulev.dev/orbital/log-vietanh",
  og: { title: "Project Log for Nguyen Viet Anh", label: "orbital" },
};

export default function OrbitalLogVietanhHead() {
  return <Seo {...seo} />;
}
