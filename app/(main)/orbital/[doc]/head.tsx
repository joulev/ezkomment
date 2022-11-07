import Seo, { Props } from "~/client13/components/seo";
import { Params } from "./page";
// for some reasons next-mdx-remote doesn't work in head.tsx so I have to use one extra dependency
import matter from "gray-matter";

const docs = ["proposal", "ms1-readme", "ms2-readme", "ms3-readme"];

export default async function OrbitalHead({ params: { doc } }: { params: Params }) {
  if (!doc || !docs.includes(doc)) return null;
  const raw = await import(`./${doc}.md`).then(m => m.default);
  const {
    data: { title, seoTitle, seoDescription: description, seoUrl },
  } = matter(raw);
  const seo: Props = { title: seoTitle, description, og: { title, label: "orbital" }, url: seoUrl };
  return <Seo {...seo} />;
}
