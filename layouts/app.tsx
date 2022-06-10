import clsx from "clsx";
import Head from "next/head";
import { FC } from "react";

import useAuth from "~/hooks/auth";

import Navbar from "~/components/app/navbar";
import AuthProvider from "~/components/auth/provider";
import Footer from "~/components/footer";

import { AppProps } from "~/types/components.type";

const App: FC<AppProps> = ({ title, removePadding, loadingScreen, children, ...rest }) => {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>{title} | ezkomment</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Navbar {...rest} />
      <main className={clsx("container", removePadding || "py-9")}>
        {user
          ? children
          : loadingScreen ?? <>You are accessing a protected page. Authenticating&hellip;</>}
      </main>
      <Footer />
    </>
  );
};

const AppLayout: FC<AppProps> = props => (
  <AuthProvider>
    <App {...props} />
  </AuthProvider>
);

export default AppLayout;
