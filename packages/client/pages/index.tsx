import { NextPage } from "next";
import Head from "next/head";

import * as home from "@client/components/home/sections";
import Footer from "@client/layouts/parts/footer";

const Home: NextPage = () => (
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
  </>
);

export default Home;
