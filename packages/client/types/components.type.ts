import { ComponentProps, MouseEventHandler, ReactNode } from "react";

import { CurrentPage } from "./page.type";
import { BannerVariant, ButtonVariant, Comment, IconAndLabel, IconType } from "./utils.type";

export type AppProps = CurrentPage & {
    title: string;
    removePadding?: boolean;
    children: ReactNode;
};

export type FooterProps = {
    className?: string;
    containerClasses?: string;
};

export type HyperlinkProps = ComponentProps<"a"> & {
    notStyled?: boolean;
};

export type BannerProps = {
    variant: BannerVariant;
    className?: string;
    children: ReactNode;
};

export type ButtonProps = (ComponentProps<"a"> & ComponentProps<"button">) & {
    variant?: ButtonVariant;
    icon?: IconType;
};

export type CommentsProps = {
    comments: Comment[];
    children?: ReactNode;
};

export type CopiableCodeProps = {
    content: string;
    className?: string;
};

export type ModalProps = {
    isVisible?: boolean;
    onOutsideClick?: MouseEventHandler<HTMLDivElement>;
    children: ReactNode;
};

export type SiteGraphProps = {
    totalComment: number[];
    newComment: number[];
};

export type IconAndLabelProps = IconAndLabel & {
    className?: string;
};

export type InputProps = (ComponentProps<"input"> & IconAndLabel) & {
    type: ComponentProps<"input">["type"]; // make `type` required.
    onUpdate?: (value: string) => void;
};

export type InputDetachedLabelProps = InputProps & {
    icon: IconType; // required
    helpText?: ReactNode;
};

export type SelectProps = (ComponentProps<"select"> & IconAndLabel) & {
    onUpdate?: (value: string) => void;
};

export type SectionProps = {
    children: ReactNode;
    illustration?: ReactNode;
};

export type WindowProps = {
    tabs: string[];
    activeTab?: number;
    children: ReactNode;
};
