import clsx from "clsx";
import Head from "next/head";
import { FC, ReactNode } from "react";

const AuthLayout: FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
  <>
    <Head>
      <title>{title} | ezkomment</title>
    </Head>
    <main className="h-screen grid place-items-center">
      <div
        className={clsx(
          "w-full h-full px-6 py-12 sm:py-6 sm:w-96 sm:h-auto mx-auto",
          "bg-white dark:bg-black sm:border sm:border-neutral-300 dark:sm:border-neutral-700 sm:rounded"
        )}
      >
        {children}
      </div>
    </main>
  </>
);

export default AuthLayout;
