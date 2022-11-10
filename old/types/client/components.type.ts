import { ComponentProps, MouseEventHandler, ReactNode } from "react";

import { Site } from "~/old/types/server";

import { CurrentPage } from "./page.type";
import { Author, BannerVariant, ButtonVariant, IconAndLabel, IconType, Toast } from "./utils.type";

export type AppProps = CurrentPage & {
    title: string;
    removePadding?: boolean;
    loadingScreen: ReactNode;
    children: ReactNode;
};

export type BlogLayoutProps = {
    title: string;
    authors: Author[];
    timestamp: Date;
    children: ReactNode;
    seo: SeoProps;
    /** Whether the post content should be full-width (`.container`) or limited-width (`.max-w-prose`) */
    container?: boolean;
};

export type NewBlogLayoutProps = {
    title: string;
    authors: Author[];
    timestamp: Date;
    children: ReactNode;
    /** Whether the post content should be full-width (`.container`) or limited-width (`.max-w-prose`) */
    container?: boolean;
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

export type SideBySideProps = {
    left: ReactNode;
    right: ReactNode;
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
    isInvalid?: boolean;
    onUpdate?: (value: string) => void;
};

export type InputDetachedLabelProps = InputProps & {
    icon: IconType; // required
    helpText?: ReactNode;
};

export type SelectProps = (ComponentProps<"select"> & IconAndLabel) & {
    onUpdate?: (value: string) => void;
};

export type IconUploaderProps = {
    label: string;
    helpText: ReactNode;
    file: File | null;
    onUpdate?: (file: File | null) => void;
};

export type HomeButtonLinkProps = {
    href: string;
    className: string;
    children: ReactNode;
};

export type HomeIllustrationProps = ComponentProps<"div"> & {
    firstOrLast?: "first" | "last";
    parts: ReactNode[];
};

export type HomeSectionProps = {
    colourClass: string;
    title: string;
    desc: ReactNode;
    button: Omit<HomeButtonLinkProps, "className">;
    firstOrLast?: HomeIllustrationProps["firstOrLast"];
    illustration: HomeIllustrationProps;
};

export type HomeWindowProps = {
    title?: ReactNode;
    children: ReactNode;
};

export type ToastProps = {
    toast: Toast;
    onClose: () => void;
};

export type SiteIconProps = ComponentProps<"img"> & {
    site: Site;
    src?: never;
};
