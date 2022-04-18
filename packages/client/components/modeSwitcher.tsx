import clsx from "clsx";
import { FC } from "react";

import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import { useMode } from "@client/context/mode";

import { IconType, Mode } from "@client/types/utils.type";

const ModeSwitcher: FC = () => {
  const modeContext = useMode();
  const mode = modeContext?.mode;
  const setMode = modeContext?.setMode;
  const modes: { value: Mode; icon: IconType }[] = [
    { value: "light", icon: LightModeOutlinedIcon },
    { value: "dark", icon: DarkModeOutlinedIcon },
    { value: "system", icon: ComputerOutlinedIcon },
  ];
  return (
    <div
      className={clsx(
        "flex flex-row items-center overflow-hidden rounded",
        "divide-x divide-card",
        "border border-card"
      )}
    >
      {modes.map(({ value, icon: Icon }, index) => (
        <button
          key={index}
          className={clsx(
            "px-2 py-1",
            value === mode
              ? "bg-indigo-500 border-indigo-500 text-white"
              : "transition text-muted hover:text-neutral-900 dark:hover:text-white " +
                  "hover:bg-neutral-200 dark:hover:bg-neutral-800"
          )}
          onClick={() => (setMode ? setMode(value) : null)}
          title={value + " mode"}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
};

export default ModeSwitcher;
