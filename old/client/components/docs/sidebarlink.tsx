import clsx from "clsx";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

import A from "~/old/client/components/anchor";

const DocsSidebarLink: FC<{ href: string; children: ReactNode }> = ({ href, children }) => {
  const router = useRouter();
  return (
    <A
      href={router.asPath === href ? undefined : href}
      notStyled
      className={clsx(
        "block mb-1.5 py-1 px-3 transition-all rounded",
        router.asPath === href
          ? "text-primary font-semibold bg-indigo-100 dark:bg-indigo-800 dark:bg-opacity-50"
          : clsx(
              "text-muted hover:text-neutral-700 hover:bg-neutral-200",
              "dark:hover:text-neutral-300 dark:hover:bg-neutral-800"
            )
      )}
    >
      {children}
    </A>
  );
};

export default DocsSidebarLink;
