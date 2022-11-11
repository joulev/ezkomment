"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { githubProvider, googleProvider, signIn, Provider } from "~/app/(auth)/auth";
import { useSetToast } from "~/app/(auth)/toast";
import A from "~/app/components/anchor.client";
import AuthError from "~/app/components/auth-error";
import Button from "~/app/components/buttons.client";
import Logo from "~/app/components/logo/logo";

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

export default function AuthPageClient() {
  const setToast = useSetToast();
  const svgRef = useTrianglify();
  const router = useRouter();

  const handler = (provider: Provider) => async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      await signIn(router.refresh, provider);
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
    }
  };

  return (
    <main className="h-screen grid place-items-center relative">
      <svg className="absolute inset-0 w-full h-full -z-10 trianglify" ref={svgRef} />
      <div className="w-full h-full px-6 py-12 sm:py-6 sm:w-96 sm:h-auto mx-auto bg-card sm:border sm:border-card sm:rounded">
        <div className="text-center">
          <A href="/" notStyled className="inline-block mx-auto">
            <Logo />
          </A>
          <h1 className="text-3xl mt-6 mb-12">Continue to ezkomment</h1>
          <div className="flex flex-col gap-6">
            <Button onClick={handler(githubProvider)}>Continue with GitHub</Button>
            <Button onClick={handler(googleProvider)}>Continue with Google</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
