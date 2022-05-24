import { ComponentProps, MouseEventHandler, ReactNode } from "react";

import { CurrentPage } from "./page.type";
import {
    Author,
    BannerVariant,
    ButtonVariant,
    Comment,
    IconAndLabel,
    IconType,
} from "./utils.type";

export type AppProps = CurrentPage & {
    title: string;
    removePadding?: boolean;
    loadingScreen?: ReactNode; // TODO: make this mandatory
    children: ReactNode;
};

export type BlogLayoutProps = {
    title: string;
    authors: Author[];
    timestamp: Date;
    children: ReactNode;
    seo: SeoProps;
};

export type BlogImageProps = {
    src: string;
    caption: string;
};

export type FooterProps = {
    className?: string;
    containerClasses?: string;
};

export type HyperlinkProps = ComponentProps<"a"> & {
    notStyled?: boolean;
};

export type BannerProps = ComponentProps<"div"> & {
    variant: BannerVariant;
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

export type ModalProps = ComponentProps<"div"> & {
    isVisible?: boolean;
    onOutsideClick?: MouseEventHandler<HTMLDivElement>;
};

export type OgImageProps = {
    title?: string;
    label?: "docs" | "posts" | "orbital";
};

export type PostHeadingProps = {
    id?: string;
    children?: ReactNode;
};

export type SeoProps = {
    title: string;
    description?: string;
    image: string;
    url: string;
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
