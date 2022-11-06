"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import A from "~/client13/components/anchor.client";
import PostHeading from "./postHeading";
import BlogImage from "./blogImage";

export type Props = {
  source: MDXRemoteSerializeResult;
};

export default function Mdx({ source }: Props) {
  return (
    <MDXRemote
      {...source}
      components={{
        a: ({ ref, ...rest }) => <A {...rest} />,
        h1: props => <PostHeading {...props} level={1} />,
        h2: props => <PostHeading {...props} level={2} />,
        h3: props => <PostHeading {...props} level={3} />,
        h4: props => <PostHeading {...props} level={4} />,
        h5: props => <PostHeading {...props} level={5} />,
        h6: props => <PostHeading {...props} level={6} />,
        img: ({ src, alt }) => <BlogImage src={src ?? ""} caption={alt ?? "no caption"} />,
      }}
    />
  );
}
