import clsx from "clsx";
import { FC } from "react";

import A from "~/client/components/anchor";

import { HomeButtonLinkProps } from "~/types/client/components.type";

import styles from "./buttonLink.module.css";

const ButtonLink: FC<HomeButtonLinkProps> = ({ href, className, children }) => (
  <A
    notStyled
    href={href}
    className={clsx(
      "text-lg md:text-xl lg:text-2xl text-gradient group [--link-bg:#d4d4d4] dark:[--link-bg:#404040]",
      styles.link,
      className
    )}
  >
    <span>{children}</span>
    <svg className="w-4.5 h-4.5 lg:w-6 lg:h-6 inline-block ml-1.5 mb-0.5" viewBox="0 0 24 24">
      <path
        d="M13 6L19 12L13 18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="-translate-x-1 group-hover:translate-x-0 transition-all"
      />
      <path
        d="M19 12L5 12"
        strokeWidth="2"
        strokeLinecap="round"
        className="-translate-x-1 group-hover:translate-x-0 transition-all [stroke-dasharray:14] [stroke-dashoffset:14] group-hover:[stroke-dashoffset:0]"
      />
    </svg>
  </A>
);

export default ButtonLink;
