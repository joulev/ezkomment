import clsx from "clsx";
import Head from "next/head";
import { FC } from "react";

import useAuth from "~/client/hooks/auth";

import Navbar from "~/client/components/app/navbar";
import AuthProvider from "~/client/components/auth/provider";
import Footer from "~/client/components/footer";

import { AppProps } from "~/types/client/components.type";

const App: FC<AppProps> = ({ title, removePadding, loadingScreen, children, ...rest }) => {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>{`${title} | ezkomment`}</title>
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
