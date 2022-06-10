import clsx from "clsx";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

import A from "~/components/anchor";

const DocsSidebarLink: FC<{ href: string; children: ReactNode }> = ({ href, children }) => {
  const router = useRouter();
  return (
    <A
      href={href}
      notStyled
      className={clsx(
        "block mb-6 transition-all",
        router.asPath === href
          ? "text-primary font-semibold"
          : "text-muted hover:text-neutral-900 dark:hover:text-neutral-100"
      )}
    >
      {children}
    </A>
  );
};

export default DocsSidebarLink;
