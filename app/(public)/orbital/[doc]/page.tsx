import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import Mdx from "~/app/components/mdx/mdx.client";
import BlogLayout from "../components/blog";
import authors from "../authors";

const docs = ["proposal", "ms1-readme", "ms2-readme", "ms3-readme"];

export type Params = { doc?: string };

async function serialise(doc: string) {
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
  if (!doc || !docs.includes(doc)) notFound();
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
