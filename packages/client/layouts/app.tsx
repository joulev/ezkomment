import Head from "next/head";
import type { FC } from "react";
import Navbar from "@client/layouts/parts/navbar";

const AppLayout: FC<{ title: string }> = ({ title, children }) => (
  <>
    <Head>
      <title>{title} | ezkomment</title>
    </Head>
    <Navbar />
    <div className="container py-6">{children}</div>
  </>
);

export default AppLayout;
