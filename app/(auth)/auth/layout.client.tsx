"use client";

import { useRef, useEffect } from "react";
import A from "~/app/components/anchor.client";
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

export default function AuthPageLayoutClient({ children }: React.PropsWithChildren) {
  const svgRef = useTrianglify();
  return (
    <main className="h-screen grid place-items-center">
      <svg className="absolute inset-0 w-full h-full -z-10 trianglify" ref={svgRef} />
      <div className="w-full h-full px-6 py-12 sm:py-6 sm:w-96 sm:h-auto mx-auto bg-card sm:border sm:border-card sm:rounded">
        <div className="text-center">
          <A href="/" notStyled className="inline-block mx-auto">
            <Logo />
          </A>
          <h1 className="text-3xl mt-6 mb-12">Continue to ezkomment</h1>
          <div className="min-h-[100px]">{children}</div>
        </div>
      </div>
    </main>
  );
}
