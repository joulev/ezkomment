import clsx from "clsx";
import { ComponentProps, FC, forwardRef, useRef, useState } from "react";

import A from "@client/components/anchor";

import { CurrentPage, NavbarItems, PageType } from "@client/types/page.type";

type Item = {
  href: string;
  label: string | [string, string]; // label || [short label, long label]
};
type Items<P extends PageType> = P extends Exclude<PageType, "others">
  ? { [N in NavbarItems[P]]: Item }
  : {};

function items(pageType: PageType, siteName?: string, pageId?: string): Items<typeof pageType> {
  switch (pageType) {
    case "overview":
      return {
        dashboard: { href: `/app/dashboard`, label: "Dashboard" },
        new: { href: `/app/new`, label: "New site" },
        account: { href: `/app/account`, label: ["Account", "Account settings"] },
      };
    case "site":
      return {
        all: { href: `/app/site/${siteName}`, label: "All pages" },
        customise: {
          href: `/app/site/${siteName}/customise`,
          label: ["Customise", "Customise display"],
        },
        settings: { href: `/app/site/${siteName}/settings`, label: "Settings" },
      };
    case "page":
      return {
        all: { href: `/app/site/${siteName}/${pageId}`, label: "All comments" },
        pending: {
          href: `/app/site/${siteName}/${pageId}/pending`,
          label: ["Pending", "Pending comments"],
        },
        settings: { href: `/app/site/${siteName}/${pageId}/settings`, label: "Settings" },
      };
    default:
      return {};
  }
}

type MainNavButtonProps = { active?: boolean } & ComponentProps<typeof A>;
const MainNavButton = forwardRef<HTMLAnchorElement, MainNavButtonProps>(
  ({ active, className, children, ...rest }, ref) => (
    <A
      notStyled
      className={clsx(
        "p-3 transition sm:hover:text-neutral-900 sm:dark:hover:text-neutral-100 whitespace-nowrap",
        active
          ? "text-neutral-900 dark:text-neutral-100"
          : "text-neutral-500 dark:text-neutral-500",
        active &&
          "relative after:absolute after:bottom-0 after:inset-x-3 after:h-0 " +
            "after:border-b-2 after:border-neutral-900 dark:after:border-neutral-100",
        className
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </A>
  )
);
MainNavButton.displayName = "MainNavButton";

const MainNav: FC<CurrentPage> = ({ type, activeTab, siteName, pageId }) => {
  const [hoverActive, setHoverActive] = useState(0);
  const [mouseInside, setMouseInside] = useState(false);
  const [allowTransition, setAllowTransition] = useState(false);
  const itemsRef = useRef<Array<(HTMLAnchorElement & HTMLSpanElement) | null>>([]);
  return (
    <div className="sm:container overflow-auto no-scrollbar">
      {/* inline-block to make sure right padding is counted, https://stackoverflow.com/a/10055203 */}
      {/* F*ck CSS */}
      <div className="pt-0 sm:pt-3 px-6 sm:px-0 inline-block">
        <nav
          className="flex flex-row -mx-3 group relative"
          onMouseEnter={() => setMouseInside(true)}
          onMouseLeave={() => {
            setMouseInside(false);
            setAllowTransition(false);
          }}
        >
          <div
            className={clsx(
              "hidden sm:block absolute top-2 h-8 -z-10 rounded",
              "group-hover:bg-neutral-200 dark:group-hover:bg-neutral-800",
              allowTransition ? "transition-all" : "transition-none"
            )}
            style={{
              width: itemsRef.current[hoverActive]?.clientWidth ?? 0,
              left: itemsRef.current[hoverActive]?.offsetLeft ?? 0,
            }}
          />
          {Object.entries(items(type, siteName, pageId)).map(([name, item], index) => (
            <MainNavButton
              key={index}
              href={item.href}
              active={activeTab === name}
              onMouseEnter={() => {
                setHoverActive(index);
                setAllowTransition(mouseInside);
              }}
              ref={el => (itemsRef.current[index] = el)}
            >
              {typeof item.label === "string" ? (
                item.label
              ) : (
                <>
                  <span className="sm:hidden">{item.label[0]}</span>
                  <span className="hidden sm:block">{item.label[1]}</span>
                </>
              )}
            </MainNavButton>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MainNav;
