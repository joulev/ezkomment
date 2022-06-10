import { GetStaticProps, NextPage } from "next";

import getOgImage from "~/client/lib/getOgImage";

import Footer from "~/client/components/footer";
import Seo from "~/client/components/seo";

import { SeoProps } from "~/types/client/components.type";

type Props = {
  seo: SeoProps;
};

const Home: NextPage<Props> = ({ seo }) => {
  return (
    <>
      <Seo {...seo} />
      <div>Hello, world</div>
      <Footer />
    </>
  );
};

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
