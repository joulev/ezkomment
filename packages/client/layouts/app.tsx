import clsx from "clsx";
import Head from "next/head";
import { FC } from "react";

import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";

import AuthContext from "@client/context/auth";
import { useAuthInit } from "@client/hooks/auth";

import Navbar from "@client/components/app/navbar";
import Footer from "@client/components/footer";
import IconLabel from "@client/components/utils/iconAndLabel";

import { AppProps } from "@client/types/components.type";

const AppLayout: FC<AppProps> = ({ title, removePadding, children, ...rest }) => {
  const providedAuth = useAuthInit();
  return (
    <AuthContext.Provider value={providedAuth}>
      <Head>
        <title>{title} | ezkomment</title>
      </Head>
      <Navbar {...rest} />
      <main className={clsx("container", removePadding || "py-9")}>{children}</main>
      <Footer />
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

export default AppLayout;
