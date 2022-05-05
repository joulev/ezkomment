import clsx from "clsx";
import Head from "next/head";
import { FC } from "react";

import Footer from "@client/layouts/parts/footer";
import Navbar from "@client/layouts/parts/navbar";

import { AppProps } from "@client/types/components.type";

const AppLayout: FC<AppProps> = ({ title, removePadding, children, ...rest }) => (
  <>
    <Head>
      <title>{title} | ezkomment</title>
    </Head>
    <Navbar {...rest} />
    <main className={clsx("container", removePadding || "py-9")}>{children}</main>
    <Footer />
  </>
);

export default AppLayout;
