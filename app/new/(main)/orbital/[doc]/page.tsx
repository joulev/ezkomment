import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import { serialize } from "next-mdx-remote/serialize";
import BlogLayout from "../components/blog";
import authors from "~/constants/authors";
import Mdx from "./components/mdx.client";

const docs = ["proposal", "ms1-readme", "ms2-readme", "ms3-readme"] as const;

export type Doc = typeof docs[number];
export type Params = { doc: Doc };

async function serialise(doc: Doc) {
  const rawContent = (await import(`./${doc}.md`).then(m => m.default)) as string;
  const source = await serialize(rawContent, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkToc],
      rehypePlugins: [rehypeSlug],
      format: "mdx",
    },
  });
  return source;
}

export default async function OrbitalDocumentPage({ params: { doc } }: { params: Params }) {
  const source = await serialise(doc);
  const { title, timestamp } = source.frontmatter!;
  return (
    <BlogLayout
      title={title}
      authors={[authors.joulev, authors.vietanh]}
      timestamp={new Date(timestamp)}
    >
      <Mdx source={source} />
    </BlogLayout>
  );
}

export function generateStaticParams() {
  return docs.map(doc => ({ doc }));
}

export const dynamicParams = false;
