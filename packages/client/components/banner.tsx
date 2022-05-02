import clsx from "clsx";
import { FC, ReactNode } from "react";

type BannerVariant = "warning";
type BannerProps = { variant: BannerVariant; className?: string; children: ReactNode };

const Banner: FC<BannerProps> = ({ variant, className, children }) => {
  const commonClasses = "p-6 rounded border bg-opacity-20";
  const variantClasses: Record<BannerVariant, string> = {
    warning: "border-amber-500 bg-amber-500",
  };
  return <div className={clsx(commonClasses, variantClasses[variant], className)}>{children}</div>;
};

export default Banner;
