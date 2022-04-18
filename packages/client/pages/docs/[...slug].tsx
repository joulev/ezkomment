import Markdown from "markdown-to-jsx";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { getFileData, getFiles } from "@client/lib/documentation";

type URLParams = { slug: string[] };
type PageProps = { fileContent: string };

const DocPage: NextPage<PageProps> = ({ fileContent }) => {
  return (
    <div>
      <Markdown>{fileContent}</Markdown>
    </div>
  );
};

const getStaticPaths: GetStaticPaths<URLParams> = async () => ({
  paths: getFiles().map(slug => ({ params: { slug } })),
  fallback: false,
});

const getStaticProps: GetStaticProps<PageProps, URLParams> = async ({ params }) => ({
  props: { fileContent: params ? getFileData(params.slug) : "something is wrong" },
});

export { DocPage as default, getStaticPaths, getStaticProps };
