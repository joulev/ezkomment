import clsx from "clsx";
import Head from "next/head";
import { FC } from "react";

import AuthContext from "@client/context/auth";
import { useAuthInit } from "@client/hooks/auth";

import Navbar from "@client/components/app/navbar";
import Footer from "@client/components/footer";
import LoadingBanner from "@client/components/loadingBanner";

import { AppProps } from "@client/types/components.type";

const AppLayout: FC<AppProps> = ({ title, removePadding, children, ...rest }) => {
  const providedAuth = useAuthInit();
  return (
    <AuthContext.Provider value={providedAuth}>
      <Head>
        <title>{title} | ezkomment</title>
      </Head>
      <Navbar {...rest} />
      <main className={clsx("container", removePadding || "py-9")}>{children}</main>
      <Footer />
      <LoadingBanner />
    </AuthContext.Provider>
  );
};

export default AppLayout;
