import Head from "next/head";
import Image from "next/legacy/image";
import { Component, ErrorInfo, FC, ReactNode } from "react";

import A from "~/client/components/anchor";
import Button from "~/client/components/buttons";

import logo from "~/public/images/logo.svg";

export const ErrorLayout: FC<{ code?: number }> = ({ code }) => {
  const errors = {
    404: "The page you requested cannot be found.",
    500: "A server error occurred, and we're working on it.",
    default:
      "An unknown error occurred, likely a client-side error. Please see the console for details.",
  };
  return (
    <>
      <Head>
        <title>{`Error${code ? ` ${code}` : ""} | ezkomment`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="h-screen grid place-items-center">
        <div className="flex flex-col items-center gap-6 max-w-md">
          <A href="/">
            <Image src={logo} alt="ezkomment" width={72} height={72} />
          </A>
          <h1 className="my-0">{code ? code : "Error"}</h1>
          <div className="text-center">
            {code && [404, 500].includes(code)
              ? errors[code.toString() as "404" | "500"]
              : errors.default}
          </div>
          <Button href="/">Return to home</Button>
        </div>
      </main>
    </>
  );
};

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    if (!process.env.VERCEL) return;
    fetch("/api/error", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: error.toString(),
        errorInfo,
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
      keepalive: true,
    });
  }
  render() {
    return this.state.hasError ? <ErrorLayout /> : this.props.children;
  }
}
