import clsx from "clsx";
import { FC } from "react";

import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";

import useAuth from "@client/hooks/auth";

import IconLabel from "./utils/iconAndLabel";

const LoadingBanner: FC = () => {
  const auth = useAuth();
  return (
    <div
      className={clsx(
        "fixed py-1.5 px-6 border rounded border-card bg-card transition-all z-50 left-9 bottom-0",
        auth.loading
          ? "-translate-y-10 opacity-100 visible"
          : "translate-y-full opacity-0 invisible"
      )}
    >
      <IconLabel icon={HourglassBottomOutlinedIcon} label="Loading&hellip;" />
    </div>
  );
};

export default LoadingBanner;
