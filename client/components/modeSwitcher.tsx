import clsx from "clsx";
import { FC } from "react";

import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import { useMode } from "~/client/hooks/theme";

import { IconType, Mode } from "~/types/client/utils.type";

/**
 * The mode switcher component is used to switch between light and dark mode. It's not customisable
 * by design. Just throw the component wherever it needs to be.
 */
const ModeSwitcher: FC = () => {
  const { mode, setMode } = useMode();
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
          onClick={() => setMode(value)}
          title={value + " mode"}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
};

export default ModeSwitcher;
