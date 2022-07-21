import { NextPage } from "next";
import { AppProps } from "next/app";
import { NextRouter } from "next/router";
import { Dispatch, FC, ReactElement, ReactNode, SetStateAction } from "react";

import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (
        page: ReactElement,
        pageProps: AppPropsWithLayout["pageProps"],
        router: NextRouter
    ) => ReactNode;
};
export type AppPropsWithLayout<P = {}> = AppProps<P> & {
    Component: NextPageWithLayout;
};

export type Mode = "light" | "dark" | "system";
export type ModeContextType = {
    mode: Mode;
    setMode: Dispatch<SetStateAction<Mode>>;
};

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "unknown";
export type BreakpointContextType = Breakpoint;

export type BuildInfo = { hash: string; timestamp: number };

export type IconType = (OverridableComponent<SvgIconTypeMap> & { muiName: string }) | FC;
export type IconAndLabel =
    | { label: ReactNode; icon?: IconType }
    | { icon: IconType; label?: ReactNode };

export type BannerVariant = "warning" | "error" | "info";
export type ButtonVariant = "primary" | "danger" | "tertiary";

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

export type ProjectLog = {
    total: number;
    logs: {
        time: string;
        content: string;
        hours: string;
        remarks: string;
    }[];
};

export type FetchOptions = {
    url: string;
    options?: RequestInit;
};

export type FetchOptionsWithMethod = FetchOptions & {
    method?: "GET" | "POST" | "PUT" | "DELETE";
};

export type PreviewComment = {
    author?: string;
    date: string;
    content: string;
};

export type Toast = {
    type: "success" | "error";
    message: ReactNode;
} | null;

export type SetToastContextType = Dispatch<SetStateAction<Toast>>;

export type ToastInit = {
    toast: Toast;
    setToast: SetToastContextType;
};
