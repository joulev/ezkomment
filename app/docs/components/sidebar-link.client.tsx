"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import A from "~/app/components/anchor.client";

export type Props = React.PropsWithChildren<{ href: string }>;

export default function DocsSidebarLink({ href, children }: Props) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <A
      href={active ? undefined : href}
      notStyled
      className={clsx(
        "block mb-1.5 py-1 px-3 transition-all rounded",
        active
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
}
