import clsx from "clsx";
import { ComponentProps, ForwardedRef, forwardRef } from "react";

import { IconType } from "@client/types/utils.type";

import A from "./anchor";
import IconLabel from "./utils/iconAndLabel";

type ButtonVariant = "primary" | "danger";
type ButtonShade = "filled" | "tertiary";
type ButtonProps = (ComponentProps<"a"> & ComponentProps<"button">) & {
  variant?: ButtonVariant;
  shade?: ButtonShade;
  icon?: IconType;
};

const baseClasses = "cursor-pointer rounded transition border";
const variantClasses: Record<ButtonVariant, Record<ButtonShade, string>> = {
  primary: {
    filled: clsx(
      "text-white bg-indigo-500 border-indigo-500",
      "hover:bg-indigo-700 hover:border-indigo-700",
      "active:bg-indigo-800 active:border-indigo-800"
    ),
    tertiary: clsx(
      "text-indigo-500 border-indigo-500",
      "hover:bg-indigo-500 hover:border-indigo-500 hover:text-white",
      "active:bg-indigo-800 active:border-indigo-800 active:text-white"
    ),
  },
  danger: {
    filled: clsx(
      "text-white bg-red-500 border-red-500",
      "hover:bg-red-700 hover:border-red-700",
      "active:bg-red-800 active:border-red-800"
    ),
    tertiary: clsx(
      "text-red-500 border-red-500",
      "hover:bg-red-500 hover:border-red-500 hover:text-white",
      "active:bg-red-800 active:border-red-800 active:text-white"
    ),
  },
};

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", shade = "filled", href, icon, className, children, ...props }, ref) => {
    const classes = clsx(
      baseClasses,
      children ? "py-1.5 px-6" : "p-1.5", // no labels
      variantClasses[variant][shade],
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
