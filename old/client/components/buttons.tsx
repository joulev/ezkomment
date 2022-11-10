import clsx from "clsx";
import { ForwardedRef, forwardRef } from "react";

import { ButtonProps } from "~/old/types/client/components.type";
import { ButtonVariant } from "~/old/types/client/utils.type";

import A from "./anchor";
import IconLabel from "./utils/iconAndLabel";

const baseClasses = "cursor-pointer rounded transition border whitespace-nowrap";
const variantClasses: Record<ButtonVariant, string> = {
  primary: clsx(
    "text-white bg-indigo-500 border-indigo-500",
    "hover:bg-indigo-700 hover:border-indigo-700",
    "active:bg-indigo-800 active:border-indigo-800"
  ),
  danger: clsx(
    "text-white bg-red-500 border-red-500",
    "hover:bg-red-700 hover:border-red-700",
    "active:bg-red-800 active:border-red-800"
  ),
  tertiary: clsx(
    "text-neutral-700 dark:text-neutral-300 border-card bg-card",
    "hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-muted",
    "active:bg-neutral-200 dark:active:bg-neutral-800"
  ),
};

/**
 * A button. Can also be used as an anchor (if `href` is provided). The button can be `ref`'d
 *
 * @param props.variant The variant of the button. Currently only `primary`, `danger` and `tertiary` are allowed
 * @param props.href The URL to which the button will link
 * @param props.icon The icon to be displayed on the button
 * @param props.className Additional classes to be added to the component (if any)
 * @param props.children A React node used as the content of the button
 */
const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", href, icon, className, children, ...props }, ref) => {
    const classes = clsx(
      baseClasses,
      children ? "py-1.5 px-6" : "p-1.5", // no labels
      variantClasses[variant],
      className
    );
    return href ? (
      <A
        notStyled
        href={href}
        className={classes}
        {...props}
        // Since props also has a ref, this one has to be last, otherwise TS is throwing
        // some really obscure errors. Costed me quite a few hours. F*ck TSX.
        ref={ref as ForwardedRef<HTMLAnchorElement>}
      >
        <IconLabel icon={icon} label={children} />
      </A>
    ) : (
      <button className={classes} {...props} ref={ref as ForwardedRef<HTMLButtonElement>}>
        <IconLabel icon={icon} label={children} />
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
