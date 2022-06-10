import { GetStaticProps, NextPage } from "next";
import { useState } from "react";

import getOgImage from "~/client/lib/getOgImage";
import prism from "~/client/lib/prism";

import * as home from "~/client/components/home/sections";
import A from "~/client/components/anchor";
import Banner from "~/client/components/banner";
import Button from "~/client/components/buttons";
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
  const [showWarningBanner, setShowWarningBanner] = useState(true);
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
      {showWarningBanner && (
        <div className="fixed bottom-0 left-0 bg-card border-card rounded m-6">
          <Banner variant="warning">
            This site is an <A href="https://orbital.comp.nus.edu.sg">NUS Orbital</A> project. It is
            not yet functional and is currently under active development.{" "}
            <Button onClick={() => setShowWarningBanner(false)} className="ml-3">
              Close
            </Button>
          </Banner>
        </div>
      )}
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
