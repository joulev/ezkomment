import Head from "next/head";
import Image from "next/image";
import { MouseEvent, useEffect, useRef } from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

import useAuth from "~/old/client/hooks/auth";
import { useSetToast } from "~/old/client/hooks/toast";
import { githubProvider, googleProvider, signIn } from "~/old/client/lib/firebase/auth";

import A from "~/old/client/components/anchor";
import AuthError from "~/old/client/components/auth/error";
import AuthProvider from "~/old/client/components/auth/provider";
import Button from "~/old/client/components/buttons";

import { Provider } from "~/old/types/client/auth.type";
import { NextPageWithLayout } from "~/old/types/client/utils.type";

import logo from "~/public/images/logo.svg";

function useTrianglify() {
  const svgEl = useRef<SVGSVGElement>(null);
  useEffect(() => {
    (async () => {
      if (!svgEl.current) return;
      const trianglify = (await import("@victorioberra/trianglify-browser")).default;
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
    })();
  }, [svgEl]);
  return svgEl;
}

const Auth: NextPageWithLayout = () => {
  const auth = useAuth();
  const setToast = useSetToast();
  const svgRef = useTrianglify();

  const handler = (provider: Provider) => async (event: MouseEvent) => {
    event.preventDefault();
    try {
      await signIn(auth, provider);
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
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
        <svg className="absolute inset-0 w-full h-full -z-10 trianglify" ref={svgRef} />
        <div className="w-full h-full px-6 py-12 sm:py-6 sm:w-96 sm:h-auto mx-auto bg-card sm:border sm:border-card sm:rounded">
          <div className="text-center">
            <A href="/" notStyled className="inline-block mx-auto">
              <Image src={logo} alt="Logo" className="w-18 h-18" />
            </A>
            <h1 className="text-3xl mt-6 mb-12">Continue to ezkomment</h1>
            <div className="flex flex-col gap-6">
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
