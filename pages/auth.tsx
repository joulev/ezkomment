import Head from "next/head";
import Image from "next/image";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import trianglify from "trianglify";

import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

import useAuth from "~/client/hooks/auth";
import { githubProvider, googleProvider, signIn } from "~/client/lib/firebase/auth";

import A from "~/client/components/anchor";
import AuthError from "~/client/components/auth/error";
import AuthProvider from "~/client/components/auth/provider";
import Banner from "~/client/components/banner";
import Button from "~/client/components/buttons";

import { Provider } from "~/types/client/auth.type";
import { NextPageWithLayout } from "~/types/client/utils.type";

import logo from "~/public/images/logo.svg";

function useTrianglify() {
  const svgEl = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!svgEl.current) return;
    const pattern = trianglify({
      width: window.innerWidth,
      height: window.innerHeight,
      cellSize: 60,
      variance: 0.75,
      fill: false,
      strokeWidth: 1,
      seed: new Date().toString(),
      xColors: ["red"], // any colour is fine, we will restyle this with CSS anyway
      yColors: ["red"], // any colour is fine, we will restyle this with CSS anyway
    });
    pattern.toSVG(svgEl.current);
  }, [svgEl]);
  return svgEl;
}

const Auth: NextPageWithLayout = () => {
  const auth = useAuth();
  const [error, setError] = useState<ReactNode>(null);
  const svgRef = useTrianglify();

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
      <main className="h-screen grid place-items-center relative">
        <svg className="absolute inset-0 -z-10 trianglify" ref={svgRef} />
        <div className="w-full h-full px-6 py-12 sm:py-6 sm:w-96 sm:h-auto mx-auto bg-card sm:border sm:border-card sm:rounded">
          <div className="text-center">
            <A href="/" notStyled>
              <Image src={logo} alt="Logo" width={72} height={72} />
            </A>
            <h1 className="text-3xl mt-6 mb-12">Continue to ezkomment</h1>
            <div className="flex flex-col gap-6">
              {error && <Banner variant="error">{error}</Banner>}
              <Button
                icon={GitHubIcon}
                onClick={handler(githubProvider)}
                disabled={auth.loading || auth.user !== undefined}
              >
                Continue with GitHub
              </Button>
              <Button
                icon={GoogleIcon}
                onClick={handler(googleProvider)}
                disabled={auth.loading || auth.user !== undefined}
              >
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
