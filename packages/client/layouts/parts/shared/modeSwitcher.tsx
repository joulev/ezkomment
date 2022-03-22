import clsx from "clsx";
import { useContext, type FC } from "react";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ModeContext from "@client/context/mode";
import type { Mode } from "@client/types/utils.type";

const ModeSwitcher: FC = () => {
  const modeContext = useContext(ModeContext);
  const mode = modeContext?.mode;
  const setMode = modeContext?.setMode;
  const modes = [
    { value: "light", icon: LightModeOutlinedIcon },
    { value: "dark", icon: DarkModeOutlinedIcon },
    { value: "system", icon: ComputerOutlinedIcon },
  ];
  return (
    <div className="flex flex-row items-center">
      {modes.map(({ value, icon: Icon }, index) => (
        <button
          key={index}
          className={clsx(
            "px-2 py-1 border-l border-y",
            value === mode
              ? "bg-indigo-500 border-indigo-500 text-white"
              : "transition border-neutral-300 dark:border-neutral-700 text-neutral-500 " +
                  "hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800",
            index === 0 && "rounded-l",
            index === 2 && "border-r rounded-r"
          )}
          onClick={() => (setMode ? setMode(value as Mode) : null)}
          title={value + " mode"}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
};

export default ModeSwitcher;
