"use client";

import * as runtime from "react/jsx-runtime";
import { run } from "@mdx-js/mdx";
import { useMDXComponents } from "@mdx-js/react";
import { useEffect, useState } from "react";

export type Props = { mdxCode: string };

export default function Mdx({ mdxCode }: Props) {
  const [mdxModule, setMdxModule] = useState<any>(null);
  const Content = mdxModule ? mdxModule.default : () => <>Loading</>;
  useEffect(() => {
    (async () => setMdxModule(await run(mdxCode, { ...runtime, useMDXComponents })))();
  }, [mdxCode]);
  return <Content />;
}
