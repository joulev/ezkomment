import clsx from "clsx";
import { FC } from "react";

import { BannerProps } from "~/types/client/components.type";
import { BannerVariant } from "~/types/client/utils.type";

/**
 * A banner (for warnings, etc.)
 *
 * @param props.variant The variant of the banner. Currently only `warning` is allowed
 * @param props.className Additional classes to be added to the component (if any)
 * @param props.children A React node used as the content of the component
 */
const Banner: FC<BannerProps> = ({ variant, className, children, ...rest }) => {
  const commonClasses = "px-6 py-3 rounded border bg-opacity-20 text-left [hyphens:auto]";
  const variantClasses: Record<BannerVariant, string> = {
    warning: "border-amber-500 bg-amber-500",
    error: "border-red-500 bg-red-500",
    info: "border-cyan-500 bg-cyan-500",
  };
  return (
    <div className={clsx(commonClasses, variantClasses[variant], className)} {...rest}>
      {children}
    </div>
  );
};

export default Banner;
