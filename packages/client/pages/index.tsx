import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import prism from "@client/lib/prism";

import * as home from "@client/components/home/sections";
import A from "@client/components/anchor";
import Banner from "@client/components/banner";
import Button from "@client/components/buttons";
import Footer from "@client/components/footer";
import HomeNavbar from "@client/components/home/navbar";

import { all as customiseCode } from "@client/constants/sampleCommentCode";
import { apiCode, plainHtmlCode } from "@client/constants/sampleHomepageCode";

type Props = {
  plainHtmlHtmlStr: string;
  customiseHtmlStr: string;
  apiHtmlStr: string;
};

const Home: NextPage<Props> = ({ plainHtmlHtmlStr, customiseHtmlStr, apiHtmlStr }) => {
  const [showWarningBanner, setShowWarningBanner] = useState(true);
  return (
    <>
      <Head>
        <title>ezkomment: Commenting made easy</title>
      </Head>
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

export const getStaticProps: GetStaticProps<Props> = () => ({
  props: {
    plainHtmlHtmlStr: prism(plainHtmlCode, {
      language: "html",
      lineNumberFrom: 146,
      highlighted: [150],
    }),
    customiseHtmlStr: prism(customiseCode.slice(0, -1), { language: "html", lineNumberFrom: 1 }),
    apiHtmlStr: prism(apiCode, { language: "javascript" }),
  },
});

export default Home;
