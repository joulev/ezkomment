import clsx from "clsx";
import type { ComponentProps, FC } from "react";

type ButtonVariant = "primary";
type ButtonProps = ComponentProps<"button"> & { variant?: ButtonVariant };

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
export const Button: FC<ButtonProps> = ({ variant = "primary", className, ...props }) => {
  return <button className={clsx(baseClasses, variantClasses[variant], className)} {...props} />;
};
