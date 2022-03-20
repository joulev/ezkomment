import clsx from "clsx";
import type { FC, ComponentProps } from "react";
import { useRef, forwardRef, useState } from "react";
import A from "@client/components/anchor";

type MainNavButtonProps = { active?: boolean } & ComponentProps<typeof A>;
const MainNavButton = forwardRef<HTMLAnchorElement, MainNavButtonProps>(
  ({ active, className, children, ...rest }, ref) => (
    <A
      notStyled
      className={clsx(
        "p-3 transition hover:text-gray-900 whitespace-nowrap",
        active ? "text-gray-900" : "text-gray-500",
        active &&
          "relative after:absolute after:bottom-0 after:inset-x-3 after:h-0 after:border-b-2 after:border-gray-900",
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

const MainNav: FC = () => {
  // To be filled with prop instead.
  const items = [
    {
      href: "/",
      label: "All pages",
    },
    {
      href: "/",
      label: ["Pending", "Pending comments"],
    },
    {
      href: "/",
      label: ["Customise", "Customise display"],
    },
    {
      href: "/",
      label: "Settings",
    },
  ];
  const active = 0; // to be filled with prop instead

  const [hoverActive, setHoverActive] = useState(0);
  const itemsRef = useRef<Array<(HTMLAnchorElement & HTMLSpanElement) | null>>([]);
  return (
    <div className="sm:container overflow-auto no-scrollbar">
      {/* inline-block to make sure right padding is counted, https://stackoverflow.com/a/10055203 */}
      {/* F*ck CSS */}
      <div className="pt-0 sm:pt-3 px-6 sm:px-0 inline-block">
        <nav className="flex flex-row -mx-3 group relative">
          <div
            className="hidden sm:block absolute group-hover:bg-gray-200 transition-all top-2 h-8 -z-10 rounded"
            style={{
              width: itemsRef.current[hoverActive]?.clientWidth ?? 0,
              left: itemsRef.current[hoverActive]?.offsetLeft ?? 0,
            }}
          />
          {items.map((item, index) => (
            <MainNavButton
              key={index}
              href={item.href}
              active={index === active}
              onMouseEnter={() => setHoverActive(index)}
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
