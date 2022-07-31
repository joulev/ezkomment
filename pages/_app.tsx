import "~/styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Demo | ezkomment</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
