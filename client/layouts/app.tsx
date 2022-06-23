import clsx from "clsx";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

import useAuth from "~/client/hooks/auth";

import Navbar from "~/client/components/app/navbar";
import Footer from "~/client/components/footer";

import { AppProps } from "~/types/client/components.type";

import AuthProvider from "../components/auth/provider";

const App: FC<AppProps> = ({ title, removePadding, loadingScreen, children, ...rest }) => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!router.query.loading) return;
    router.push(router.asPath.split("?")[0], undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <>
      <Head>
        <title>{`${title} | ezkomment`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Navbar {...rest} />
      <main className={clsx("container", removePadding || "py-9")}>
        {user && !router.query.loading ? children : loadingScreen}
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
