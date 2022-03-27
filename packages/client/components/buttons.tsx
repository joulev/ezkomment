import clsx from "clsx";
import { ComponentProps, ForwardedRef, forwardRef } from "react";

import A from "./anchor";

type ButtonVariant = "primary";
type ButtonProps = ComponentProps<"a"> & ComponentProps<"button"> & { variant?: ButtonVariant };

const baseClasses = "cursor-pointer rounded py-1.5 px-6 transition";
const variantClasses: Record<ButtonVariant, string> = {
  primary: "text-white bg-indigo-500 hover:bg-indigo-700 active:bg-indigo-800",
};

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", href, className, ...props }, ref) => {
    return href ? (
      <A
        notStyled
        href={href}
        className={clsx(baseClasses, variantClasses[variant], className)}
        {...props}
        // Since props also has a ref, this one has to be last, otherwise TS is throwing
        // some really obscure errors. Costed me quite a few hours. F*ck TSX.
        ref={ref as ForwardedRef<HTMLAnchorElement>}
      />
    ) : (
      <button
        className={clsx(baseClasses, variantClasses[variant], className)}
        {...props}
        ref={ref as ForwardedRef<HTMLButtonElement>}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
