import { FC, ReactNode } from "react";

import clsx from "clsx";
import Link from "next/link";

type ButtonProps = { href: string; isPrimary?: boolean; className?: string; children: ReactNode };
const Button: FC<ButtonProps> = ({ href, isPrimary, className, children }) => {
  const computedClassName = clsx(
    "px-8 py-2 text-center border border-indigo-500 transition",
    isPrimary
      ? "bg-indigo-500 text-white hover:bg-indigo-700 hover:border-indigo-700"
      : "text-indigo-500 hover:bg-indigo-500 hover:text-white",
    className
  );
  if (href[0] === "/")
    return (
      <Link href={href}>
        <a className={computedClassName} role="button">
          {children}
        </a>
      </Link>
    );
  return (
    <a href={href} role="button" className={computedClassName}>
      {children}
    </a>
  );
};

export default Button;
