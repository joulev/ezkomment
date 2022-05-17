import clsx from "clsx";
import Head from "next/head";
import { FC, ReactNode } from "react";

import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";

import AuthContext from "@client/context/auth";
import { useAuthInit } from "@client/hooks/auth";

import IconLabel from "@client/components/utils/iconAndLabel";

const AuthLayout: FC<{ title: string; children: ReactNode }> = ({ title, children }) => {
  const providedAuth = useAuthInit();
  return (
    <AuthContext.Provider value={providedAuth}>
      <Head>
        <title>{title} | ezkomment</title>
      </Head>
      <main className="h-screen grid place-items-center">
        <div
          className={clsx(
            "w-full h-full px-6 py-12 sm:py-6 sm:w-96 sm:h-auto mx-auto",
            "bg-card sm:border sm:border-neutral-300 dark:sm:border-neutral-700 sm:rounded"
          )}
        >
          {children}
        </div>
      </main>
      <div
        className={clsx(
          "fixed py-1.5 px-6 border rounded border-card bg-card transition-all z-50 left-9 bottom-0",
          providedAuth.loading
            ? "-translate-y-10 opacity-100 visible"
            : "translate-y-full opacity-0 invisible"
        )}
      >
        <IconLabel icon={HourglassBottomOutlinedIcon} label="Loading&hellip;" />
      </div>
    </AuthContext.Provider>
  );
};

export default AuthLayout;
