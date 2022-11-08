import Seo, { Props } from "~/app/components/seo";

const seo: Props = {
  title: "ezkomment: Commenting made easy",
  description:
    "No complicated backend configuration. Add a comment section anywhere – even if you use plain HTML, we got you covered.",
  og: {},
  url: "https://ezkomment.joulev.dev",
};

export default function IndexHead() {
  return <Seo {...seo} />;
}
