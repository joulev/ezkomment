import Head from "next/head";
import type { FC } from "react";
import Navbar from "@client/layouts/parts/navbar";

const AppLayout: FC<{ title: string }> = ({ title, children }) => (
  <>
    <Head>
      <title>{title} | ezkomment</title>
    </Head>
    <Navbar />
    {children}
  </>
);

export default AppLayout;
