import { GetStaticProps, NextPage } from "next";

import getOgImage from "~/client/lib/getOgImage";

import Footer from "~/client/components/footer";
import EasySections from "~/client/components/home/easy";
import Hero from "~/client/components/home/hero";
import FinalSections from "~/client/components/home/spaceship";
import Seo from "~/client/components/seo";

import { SeoProps } from "~/types/client/components.type";

type Props = {
  seo: SeoProps;
};

const Home: NextPage<Props> = ({ seo }) => (
  <>
    <Seo {...seo} />
    <Hero />
    <EasySections />
    <FinalSections />
    <Footer />
  </>
);

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    seo: {
      title: "ezkomment: Commenting made easy",
      description:
        "No complicated backend configuration. Add a comment section anywhere – even if you use plain HTML, we got you covered.",
      image: await getOgImage({}),
      url: "https://ezkomment.joulev.dev",
    },
  },
});

export default Home;
