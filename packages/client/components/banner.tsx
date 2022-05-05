import clsx from "clsx";
import { FC } from "react";

import { BannerProps } from "@client/types/components.type";
import { BannerVariant } from "@client/types/utils.type";

/**
 * A banner (for warnings, etc.)
 *
 * @param props.variant The variant of the banner. Currently only `warning` is allowed
 * @param props.className Additional classes to be added to the component (if any)
 * @param props.children A React node used as the content of the component
 */
const Banner: FC<BannerProps> = ({ variant, className, children }) => {
  const commonClasses = "p-6 rounded border bg-opacity-20";
  const variantClasses: Record<BannerVariant, string> = {
    warning: "border-amber-500 bg-amber-500",
  };
  return <div className={clsx(commonClasses, variantClasses[variant], className)}>{children}</div>;
};

export default Banner;
