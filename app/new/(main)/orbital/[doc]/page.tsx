import { compile, nodeTypes } from "@mdx-js/mdx";
import rehypeRaw from "rehype-raw";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import BlogLayout from "../components/blog";
import Mdx from "../components/mdx/mdx.client";
import MDXProvider from "../components/mdx/mdxProvider.client";
import authors from "~/constants/authors";

const docs = ["proposal", "ms1-readme", "ms2-readme", "ms3-readme"] as const;

type Doc = typeof docs[number];
type Params = { doc: Doc };

async function getContent(doc: Doc) {
  const rawContent = await import(`./${doc}.mdx`).then(m => m.default);
  const content = String(
    await compile(rawContent, {
      outputFormat: "function-body",
      rehypePlugins: [
        // https://github.com/orgs/mdx-js/discussions/2023#discussioncomment-2649772
        [rehypeRaw, { passThrough: nodeTypes }],
        rehypeSlug,
      ],
      remarkPlugins: [remarkToc],
      providerImportSource: "@mdx-js/react",
    })
  );
  return content;
}

export default async function OrbitalDocumentPage({ params }: { params: Params }) {
  const { doc } = params;
  const content = await getContent(doc);
  return (
    <MDXProvider>
      <BlogLayout
        title="Orbital 2022 Milestone 1 README"
        authors={[authors.joulev, authors.vietanh]}
        timestamp={new Date("2022-05-27")}
      >
        <Mdx mdxCode={content} />
      </BlogLayout>
    </MDXProvider>
  );
}

export function generateStaticParams() {
  return docs.map(doc => ({ doc }));
}

export const dynamicParams = false;
