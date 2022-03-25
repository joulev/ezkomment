import clsx from "clsx";
import { ComponentProps, FC, Ref } from "react";

import A from "./anchor";

type ButtonVariant = "primary";
type ButtonProps = ComponentProps<"button"> & { variant?: ButtonVariant };
type ButtonLinkProps = ComponentProps<"a"> & {
  ref?: Ref<HTMLAnchorElement>; // need this since <A> also has a React ref.
  variant?: ButtonVariant;
};

const baseClasses = "rounded py-1.5 px-6 transition";
const variantClasses: Record<ButtonVariant, string> = {
  primary: "text-white bg-indigo-500 hover:bg-indigo-700 active:bg-indigo-800",
};

/**
 * A wraper with styling for the `button` component.
 *
 * @param props.variant The variant of the button. Optional, defaults to "primary".
 * @note Normal `button` component props are also supported.
 */
export const Button: FC<ButtonProps> = ({ variant = "primary", className, ...props }) => (
  <button className={clsx(baseClasses, variantClasses[variant], className)} {...props} />
);

/**
 * A wraper with button-like styling for the `A` component, which in turn wraps the `a` tag.
 *
 * @param props.variant The variant of the button. Optional, defaults to "primary".
 * @note Normal `a` component props are also supported.
 */
export const LinkButton: FC<ButtonLinkProps> = ({ variant = "primary", className, ...props }) => (
  <A notStyled className={clsx(baseClasses, variantClasses[variant], className)} {...props} />
);
