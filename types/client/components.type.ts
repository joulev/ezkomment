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
    onUpdate?: (value: string) => void;
};

export type InputDetachedLabelProps = InputProps & {
    icon: IconType; // required
    helpText?: ReactNode;
};

export type SelectProps = (ComponentProps<"select"> & IconAndLabel) & {
    onUpdate?: (value: string) => void;
};

export type HomeButtonLinkProps = {
    href: string;
    className: string;
    children: ReactNode;
};

export type HomeIllustrationProps = ComponentProps<"div"> & {
    parts: ReactNode[];
};

export type HomeSectionProps = {
    title: {
        className: string;
        children: string;
    };
    desc: ReactNode;
    button: HomeButtonLinkProps;
    illustration: HomeIllustrationProps;
};
