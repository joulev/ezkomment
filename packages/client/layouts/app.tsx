import Head from "next/head";
import { FC } from "react";

import Footer from "@client/layouts/parts/footer";
import Navbar from "@client/layouts/parts/navbar";

const AppLayout: FC<{ title: string }> = ({ title, children }) => (
  <>
    <Head>
      <title>{title} | ezkomment</title>
    </Head>
    <Navbar />
    <div className="container py-6">{children}</div>
    <Footer />
  </>
);

export default AppLayout;
