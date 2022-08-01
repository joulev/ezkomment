import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";

import Button from "~/components/button";
import Logo from "~/components/logo";
import { DemoPageProps } from "~/types";

import "~/styles/globals.css";

const Template: FC<{ template: DemoPageProps["template"] }> = ({ template }) => {
  if (template === "default") return <>Default</>;
  if (template === "not used") return <>Not used</>;
  return (
    <a href={template.url} className="text-indigo-500 underline underline-offset-2">
      Customised
    </a>
  );
};

export default function MyApp({ Component, pageProps }: AppProps) {
  if (Object.hasOwn(pageProps, "statusCode") || Object.hasOwn(pageProps, "isNotDemo"))
    return <Component {...pageProps} />;
  const props = pageProps as DemoPageProps;
  return (
    <div className={props.bgClass}>
      <Head>
        <title>{`${props.title} | Demo | ezkomment`}</title>
      </Head>
      <div className="container py-18 px-12 mx-auto flex flex-col lg:flex-row gap-12 w-fit max-w-full">
        <div className="text-black dark:text-white">
          <div className="sticky top-18 lg:w-72 flex flex-col gap-6">
            <div>
              <Logo />
            </div>
            <div>
              <dl>
                <dt className="uppercase text-sm font-semibold text-neutral-500 mb-1.5">
                  Template
                </dt>
                <dd className="mb-6">
                  <Template template={props.template} />
                </dd>
                <dt className="uppercase text-sm font-semibold text-neutral-500 mb-1.5">
                  Dark mode
                </dt>
                <dd>{props.darkMode ? "Yes" : "No"}</dd>
              </dl>
            </div>
            <div className="flex flex-col gap-3">
              <Button href="/">Other demos</Button>
              <Button href={props.sourceURL}>View source</Button>
              {typeof props.template !== "string" && (
                <Button href={props.template.url}>View template</Button>
              )}
              <Button href="https://ezkomment.joulev.dev" isPrimary>
                Go to ezkomment
              </Button>
            </div>
          </div>
        </div>
        <div className="max-w-prose">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}
