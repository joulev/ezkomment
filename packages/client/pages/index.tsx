import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import * as home from "@client/components/home/sections";
import A from "@client/components/anchor";
import Banner from "@client/components/banner";
import Button from "@client/components/buttons";
import Footer from "@client/layouts/parts/footer";

const Home: NextPage = () => {
  const [showWarningBanner, setShowWarningBanner] = useState(true);
  return (
    <>
      <Head>
        <title>ezkomment: Commenting made easy</title>
      </Head>
      <home.Navbar />
      <home.Banner />
      <home.PlainHTML />
      <home.Moderation />
      <home.Customisation />
      <home.Api />
      <home.Ending />
      <Footer className="px-6 sm:px-10" containerClasses="mx-auto w-full lg:w-5/6 xl:w-4/5" />
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

export default Home;
