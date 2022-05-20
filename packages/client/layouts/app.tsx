import clsx from "clsx";
import Head from "next/head";
import { FC } from "react";

import Navbar from "@client/components/app/navbar";
import AuthProvider from "@client/components/auth/provider";
import Footer from "@client/components/footer";

import { AppProps } from "@client/types/components.type";

const AppLayout: FC<AppProps> = ({ title, removePadding, children, ...rest }) => (
  <AuthProvider>
    <Head>
      <title>{title} | ezkomment</title>
    </Head>
    <Navbar {...rest} />
    <main className={clsx("container", removePadding || "py-9")}>{children}</main>
    <Footer />
  </AuthProvider>
);

export default AppLayout;
