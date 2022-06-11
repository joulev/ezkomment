import clsx from "clsx";
import { FC } from "react";

import { HomeButtonLinkProps } from "~/types/client/components.type";

import A from "../anchor";

const ButtonLink: FC<HomeButtonLinkProps> = ({ href, className, children }) => {
  return (
    <A
      notStyled
      href={href}
      className={clsx("text-lg md:text-xl lg:text-2xl text-gradient group landing-link", className)}
    >
      <span>{children}</span>
      <svg className="w-4.5 h-4.5 lg:w-6 lg:h-6 inline-block ml-1.5 mb-0.5" viewBox="0 0 24 24">
        <path
          d="M13 6L19 12L13 18"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="-translate-x-1 group-hover:translate-x-0 transition-transform"
        />
        <path
          d="M19 12L5 12"
          strokeWidth="2"
          strokeLinecap="round"
          className="-translate-x-1 group-hover:translate-x-0 transition-transform arrow-bar"
        />
      </svg>
    </A>
  );
};

export default ButtonLink;
