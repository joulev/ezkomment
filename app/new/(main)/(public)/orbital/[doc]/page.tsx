import { compile } from "@mdx-js/mdx";
import Mdx from "../components/mdx.client";

const docs = ["proposal", "ms1-readme", "ms2-readme", "ms3-readme"] as const;

type Doc = typeof docs[number];
type Params = { doc: Doc };

async function getContent(doc: Doc) {
  const rawContent = (await import(`./${doc}.mdx`).then(x => x.default)) as string;
  const content = String(await compile(rawContent, { outputFormat: "function-body" }));
  return content;
}

export default async function Page({ params }: { params: Params }) {
  const { doc } = params;
  const content = await getContent(doc);
  return <Mdx mdxCode={content} />;
}

export function generateStaticParams() {
  return docs.map(doc => ({ doc }));
}

export const dynamicParams = false;
