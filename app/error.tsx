"use client";

import { useEffect } from "react";
import A from "./components/anchor.client";
import Button from "./components/buttons.client";
import Logo from "./components/logo/logo";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Uncaught error:", error);
    if (!process.env.VERCEL) return;
    fetch("/api/error", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: error.toString(),
        stack: error.stack,
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
      keepalive: true,
    });
  }, [error]);

  return (
    <main className="h-screen grid place-items-center">
      <div className="w-full h-full px-6 py-12 sm:py-6 sm:w-96 sm:h-auto mx-auto bg-card sm:border sm:border-card sm:rounded">
        <div className="text-center">
          <A href="/" notStyled className="inline-block mx-auto">
            <Logo />
          </A>
          <h1 className="text-3xl mt-6">Oops</h1>
          <div className="flex flex-col gap-6">
            <div>
              Something went wrong. We have been notified. You can try again or return to the
              homepage.
            </div>
            <Button variant="tertiary">Try again</Button>
            <Button href="/">Return to home</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
