import clsx from "clsx";
import Head from "next/head";
import { FC } from "react";

import Footer from "@client/layouts/parts/footer";
import Navbar from "@client/layouts/parts/navbar";

import { CurrentPage } from "@client/types/page.type";

type AppProps = CurrentPage & { title: string; removePadding?: boolean };

const AppLayout: FC<AppProps> = ({ title, removePadding, children, ...rest }) => (
  <>
    <Head>
      <title>{title} | ezkomment</title>
    </Head>
    <Navbar {...rest} />
    <div className={clsx("container", removePadding || "py-9")}>{children}</div>
    <Footer />
  </>
);

export default AppLayout;
