import clsx from "clsx";
import { ComponentProps, ForwardedRef, forwardRef } from "react";

import { IconType } from "@client/types/utils.type";

import A from "./anchor";
import IconLabel from "./utils/iconAndLabel";

type ButtonVariant = "primary" | "danger";
type ButtonProps = (ComponentProps<"a"> & ComponentProps<"button">) & {
  variant?: ButtonVariant;
  icon?: IconType;
};

const baseClasses = "cursor-pointer rounded py-1.5 px-6 transition";
const variantClasses: Record<ButtonVariant, string> = {
  primary: "text-white bg-indigo-500 hover:bg-indigo-700 active:bg-indigo-800",
  danger: "text-white bg-red-500 hover:bg-red-700 active:bg-red-800",
};

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", href, icon, className, children, ...props }, ref) => {
    return href ? (
      <A
        notStyled
        href={href}
        className={clsx(baseClasses, variantClasses[variant], className)}
        {...props}
        // Since props also has a ref, this one has to be last, otherwise TS is throwing
        // some really obscure errors. Costed me quite a few hours. F*ck TSX.
        ref={ref as ForwardedRef<HTMLAnchorElement>}
      >
        <IconLabel icon={icon} label={children} />
      </A>
    ) : (
      <button
        className={clsx(baseClasses, variantClasses[variant], className)}
        {...props}
        ref={ref as ForwardedRef<HTMLButtonElement>}
      >
        <IconLabel icon={icon} label={children} />
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
