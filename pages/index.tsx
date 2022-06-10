import { GetStaticProps, NextPage } from "next";

import getOgImage from "~/client/lib/getOgImage";
import prism from "~/client/lib/prism";

import * as home from "~/client/components/home/sections";
import Footer from "~/client/components/footer";
import HomeNavbar from "~/client/components/home/navbar";
import Seo from "~/client/components/seo";

import { SeoProps } from "~/types/client/components.type";

import { all as customiseCode } from "~/constants/sampleCommentCode";
import { apiCode, plainHtmlCode } from "~/constants/sampleHomepageCode";

type Props = {
  plainHtmlHtmlStr: string;
  customiseHtmlStr: string;
  apiHtmlStr: string;
  seo: SeoProps;
};

const Home: NextPage<Props> = ({ plainHtmlHtmlStr, customiseHtmlStr, apiHtmlStr, seo }) => {
  return (
    <>
      <Seo {...seo} />
      <HomeNavbar />
      <home.Banner />
      <home.PlainHTML codeHtml={plainHtmlHtmlStr} />
      <home.Moderation />
      <home.Customisation codeHtml={customiseHtmlStr} />
      <home.Api codeHtml={apiHtmlStr} />
      <home.Ending />
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const plainHtmlHtmlStr = prism(plainHtmlCode, {
    language: "html",
    lineNumberFrom: 146,
    highlighted: [150],
  });
  const customiseHtmlStr = prism(customiseCode.slice(0, -1), {
    language: "html",
    lineNumberFrom: 1,
  });
  const apiHtmlStr = prism(apiCode, { language: "javascript" });
  const image = await getOgImage({});
  return {
    props: {
      plainHtmlHtmlStr,
      customiseHtmlStr,
      apiHtmlStr,
      seo: {
        title: "ezkomment: Commenting made easy",
        description:
          "No complicated backend configuration. Add a comment section anywhere – even if you use plain HTML, we got you covered.",
        image,
        url: "https://ezkomment.joulev.dev",
      },
    },
  };
};

export default Home;
