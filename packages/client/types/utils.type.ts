import { Dispatch, ReactNode, SetStateAction } from "react";

import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";

export type Mode = "light" | "dark" | "system";
export type ModeContextType = {
    mode: Mode;
    setMode: Dispatch<SetStateAction<Mode>>;
};

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "unknown";
export type BreakpointContextType = Breakpoint;

export type BuildInfo = { hash: string; timestamp: number };

export type IconType = OverridableComponent<SvgIconTypeMap> & { muiName: string };
export type IconAndLabel =
    | { label: ReactNode; icon?: IconType }
    | { icon: IconType; label?: ReactNode };

export type BannerVariant = "warning";
export type ButtonVariant = "primary" | "danger" | "tertiary";
export type Comment = { author: string; date: string; text: string };

export type PrismLanguage = "html" | "javascript";
export type PrismOptions = {
    language: PrismLanguage;
    /**
     * If `undefined`, line numbers are not shown. Otherwise, this is the number for the first line.
     */
    lineNumberFrom?: number;
    /**
     * Array of line numbers to be highlighted. `undefined` is treated as `[]`.
     */
    highlighted?: number[];
};

export type Author = {
    name: string;
    github?: string;
};

export type BlogAnchor = {
    id: string;
    title: string;
    level: "h2" | "h3";
};
