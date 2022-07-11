import clsx from "clsx";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, createContext, useEffect, useState } from "react";

import useAuth from "~/client/hooks/auth";

import Navbar from "~/client/components/app/navbar";
import Notifications from "~/client/components/app/notification";
import AuthProvider from "~/client/components/auth/provider";
import Footer from "~/client/components/footer";

import { AppProps } from "~/types/client/components.type";

export const NotificationShowSetter = createContext<(_: boolean) => void>(() => {});

const App: FC<AppProps> = ({ title, removePadding, loadingScreen, children, ...rest }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [showNotif, setShowNotif] = useState(false);
  useEffect(() => {
    if (!router.query.loading) return;
    router.push(router.asPath.split("?")[0], undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <NotificationShowSetter.Provider value={setShowNotif}>
      <Head>
        <title>{`${title} | ezkomment`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Navbar {...rest} />
      <main className={clsx("container", removePadding || "py-9")}>
        {user && !router.query.loading ? children : loadingScreen}
      </main>
      <Footer />
      <Notifications show={showNotif} onClose={() => setShowNotif(false)} />
    </NotificationShowSetter.Provider>
  );
};

const AppLayout: FC<AppProps> = props => (
  <AuthProvider>
    <App {...props} />
  </AuthProvider>
);

export default AppLayout;
