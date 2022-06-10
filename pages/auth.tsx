import Head from "next/head";
import Image from "next/image";
import { MouseEvent, ReactNode, useState } from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

import useAuth from "~/hooks/auth";
import { githubProvider, googleProvider, signIn } from "~/lib/client/firebase/auth";

import A from "~/components/anchor";
import AuthError from "~/components/auth/error";
import AuthProvider from "~/components/auth/provider";
import Banner from "~/components/banner";
import Button from "~/components/buttons";

import { Provider } from "~/types/auth.type";
import { NextPageWithLayout } from "~/types/utils.type";

import logo from "~/public/images/logo.svg";

const Auth: NextPageWithLayout = () => {
  const auth = useAuth();
  const [error, setError] = useState<ReactNode>(null);

  const handler = (provider: Provider) => async (event: MouseEvent) => {
    event.preventDefault();
    try {
      await signIn(auth, provider);
    } catch (err: any) {
      setError(<AuthError err={err} />);
      auth.setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Authentication | ezkomment</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="h-screen grid place-items-center">
        <div className="w-full h-full px-6 py-12 sm:py-6 sm:w-96 sm:h-auto mx-auto bg-card sm:border sm:border-card sm:rounded">
          <div className="text-center">
            <A href="/" notStyled>
              <Image src={logo} alt="Logo" width={72} height={72} />
            </A>
            <h1 className="text-3xl mt-6 mb-12">Continue to ezkomment</h1>
            <div className="flex flex-col gap-6">
              {error && <Banner variant="error">{error}</Banner>}
              <Button icon={GitHubIcon} onClick={handler(githubProvider)} disabled={auth.loading}>
                Continue with GitHub
              </Button>
              <Button icon={GoogleIcon} onClick={handler(googleProvider)} disabled={auth.loading}>
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
