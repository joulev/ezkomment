import Head from "next/head";
import Button from "~/components/button";
import Logo from "~/components/logo";
import { NextPage, GetStaticProps } from "~/types";

const Home: NextPage = () => (
  <div className="bg-neutral-100 min-h-screen grid place-items-center">
    <Head>
      <title>Demo | ezkomment</title>
    </Head>
    <div className="py-18 px-12 w-full max-w-2xl grid sm:grid-cols-2 gap-6">
      <div className="col-span-full">
        <Logo />
      </div>
      <Button className="px-0 py-8" href="/default/light">
        Default template (light)
      </Button>
      <Button className="px-0 py-8" href="/default/dark">
        Default template (dark)
      </Button>
      <Button className="px-0 py-8" href="/customised">
        Customised template
      </Button>
      <Button className="px-0 py-8" href="/with-api">
        With REST API
      </Button>
    </div>
  </div>
);

export const getStaticProps: GetStaticProps = () => ({ props: { isNotDemo: true } });

export default Home;
