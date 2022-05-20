import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";
import { MouseEvent, ReactNode, useState } from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

import { loadingEnd } from "@client/hooks/nprogress";
import { githubProvider, googleProvider, signIn } from "@client/lib/firebase/auth";

import A from "@client/components/anchor";
import AuthError from "@client/components/auth/error";
import AuthProvider from "@client/components/auth/provider";
import Banner from "@client/components/banner";
import Button from "@client/components/buttons";

import { Provider } from "@client/types/utils.type";
import { NextPageWithLayout } from "@client/types/utils.type";

import logo from "@client/public/images/logo.svg";

const Auth: NextPageWithLayout = () => {
  const [error, setError] = useState<ReactNode>(null);

  const handler = (provider: Provider) => async (event: MouseEvent) => {
    event.preventDefault();
    try {
      await signIn(provider);
    } catch (err: any) {
      setError(<AuthError err={err} />);
      window.dispatchEvent(loadingEnd);
    }
  };

  return (
    <>
      <Head>
        <title>Authentication | ezkomment</title>
      </Head>
      <main className="h-screen grid place-items-center">
        <div
          className={clsx(
            "w-full h-full px-6 py-12 sm:py-6 sm:w-96 sm:h-auto mx-auto",
            "bg-card sm:border sm:border-neutral-300 dark:sm:border-neutral-700 sm:rounded"
          )}
        >
          <div className="text-center">
            <A href="/" notStyled>
              <Image src={logo} alt="Logo" width={80} height={80} />
            </A>
            <h1 className="text-3xl mt-6 mb-12">Continue to ezkomment</h1>
            <div className="flex flex-col gap-6">
              {error && <Banner variant="error">{error}</Banner>}
              <Button icon={GitHubIcon} onClick={handler(githubProvider)}>
                Continue with GitHub
              </Button>
              <Button icon={GoogleIcon} onClick={handler(googleProvider)}>
                Continue with Google
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

Auth.getLayout = page => <AuthProvider>{page}</AuthProvider>;

export default Auth;
