import Head from "next/head";
import Button from "~/components/button";
import Logo from "~/components/logo";
import { NextPage, GetStaticProps } from "~/types";

const Home: NextPage = () => (
  <div className="bg-neutral-100 min-h-screen grid place-items-center">
    <Head>
      <title>Demo | ezkomment</title>
    </Head>
    <div className="py-16 px-8 w-full max-w-2xl grid sm:grid-cols-2 gap-4">
      <div className="col-span-full">
        <Logo />
      </div>
      <Button href="/default/light">Default template (light)</Button>
      <Button href="/default/dark">Default template (dark)</Button>
      <Button href="/customised">Customised template</Button>
      <Button href="/with-api">With REST API</Button>
    </div>
  </div>
);

export const getStaticProps: GetStaticProps = () => ({ props: { isNotDemo: true } });

export default Home;
