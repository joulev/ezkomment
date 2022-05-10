import { NextPage } from "next";

import BlogLayout from "@client/layouts/blog";

import Post, { meta } from "@client/markdown/orbital/proposal.mdx";

const OrbitalProposal: NextPage = () => <BlogLayout {...meta}>{Post}</BlogLayout>;

export default OrbitalProposal;
