import { GetStaticProps, NextPage } from "next";

import getOgImage from "~/old/client/lib/getOgImage";

import Footer from "~/old/client/components/footer";
import EasySections from "~/old/client/components/home/easy";
import Hero from "~/old/client/components/home/hero";
import FinalSections from "~/old/client/components/home/spaceship";
import Seo from "~/old/client/components/seo";

import { SeoProps } from "~/old/types/client/components.type";

type Props = { seo: SeoProps };

const Home: NextPage<Props> = ({ seo }) => (
  <>
    <Seo {...seo} />
    <Hero />
    <EasySections />
    <FinalSections />
    <Footer />
  </>
);

export const getStaticProps: GetStaticProps<Props> = () => ({
  props: {
    seo: {
      title: "ezkomment: Commenting made easy",
      description:
        "No complicated backend configuration. Add a comment section anywhere – even if you use plain HTML, we got you covered.",
      image: getOgImage({}),
      url: "https://ezkomment.joulev.dev",
    },
  },
});

export default Home;
