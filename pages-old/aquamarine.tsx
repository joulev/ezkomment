import { NextPage } from "next";
import Head from "next/head";

const _: NextPage = () => (
  <>
    <Head>
      <title>アクアマリン</title>
      <meta name="robots" content="noindex" />
    </Head>
    <main
      className="w-screen h-screen grid place-items-center p-6"
      style={{ backgroundColor: "aquamarine" }}
    >
      <div className="text-black">
        私は、<b>アクアマリン</b>という色が大好きですから、
        <br />
        この特別なページを作ってしまいました（笑）。
      </div>
    </main>
  </>
);

export default _;
