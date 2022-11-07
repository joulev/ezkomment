import { notFound } from "next/navigation";
import rehypeSlug from "rehype-slug";
import { serialize } from "next-mdx-remote/serialize";
import Mdx from "~/client13/components/mdx/mdx.client";
import DocsBottomBar from "../components/bottombar.client";
import { filePaths, getLastModified, pathExists } from "../documentation";

export type Params = { slug: string[] };

async function serialise(path: string[]) {
  const rawContent = await import(`~/docs/${path.join("/")}.md`).then(m => m.default);
  const source = await serialize(rawContent, {
    mdxOptions: { rehypePlugins: [rehypeSlug], format: "mdx" },
  });
  return source;
}

export default async function DocsPage({ params: { slug } }: { params: Params }) {
  if (!pathExists(slug)) notFound();
  const source = await serialise(slug);
  const lastModified = await getLastModified(slug);
  return (
    <main className="ml-0 mt-18 lg:ml-96 lg:mt-0">
      <div className="container lg:max-w-prose py-12">
        <article className="post">
          <Mdx source={source} />
        </article>
        <hr />
        <DocsBottomBar lastModified={lastModified} path={slug} />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return filePaths.map(slug => ({ slug }));
}
