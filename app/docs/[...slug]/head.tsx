import Seo, { Props } from "~/app/components/seo";
import { Params } from "./page";
import { getTitle, pathExists } from "../documentation";

export default async function DocsHead({ params: { slug } }: { params: Params }) {
  if (!pathExists(slug)) return null;
  const title = getTitle(slug);
  const seo: Props = {
    title: `${title} | ezkomment Docs`,
    description: "Welcome to the official ezkomment documentation!",
    og: { title, label: "docs" },
    url: `https://ezkomment.joulev.dev/docs/${slug.join("/")}`,
  };
  return <Seo {...seo} />;
}
