import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";

export type Mode = "light" | "dark" | "system";
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "unknown";
export type BuildInfo = { hash: string; timestamp: number };
export type IconType = OverridableComponent<SvgIconTypeMap> & { muiName: string };
