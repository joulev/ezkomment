import clsx from "clsx";
import Link from "next/link";
import { forwardRef } from "react";

import { HyperlinkProps } from "~/old/types/client/components.type";

/**
 * A wrapper for `next/link` to handle all anchors inside the app, including in-page links (#),
 * internal links and external links.
 *
 * In-page links will use normal `<a>`, internal links will be handled by `next/link` and external
 * links will be opened in a new browser tab.
 *
 * @note This component is intentionally named `A` to closely resemble `<a>` in HTML. In case of
 *       conflicts (who the hell names another thing `A`?), just import it with a different name.
 *
 * @note I honestly don't know why it's & in the TS signmature instead of |. Whatever works I guess.
 *
 * @param props.href        The href of the anchor. If not provided, the "anchor" will work as
 *                          link-like normal text (if `notStyled` is `false`)
 * @param props.notStyled   If true, the anchor will not be styled. Otherwise, the anchor will be
 *                          given the class `a` defined in `globals.css`.
 * @param props.className   Other classes that the anchor may have.
 */
const A = forwardRef<HTMLAnchorElement, HyperlinkProps>(
  ({ href, notStyled, className, children, ...rest }, ref) => {
    const cls = clsx(notStyled || "a", className);
    const props = { className: cls, ...rest, ref };

    if (!href) return <a {...props}>{children}</a>;
    if (href === "/docs") {
      return (
        <Link
          href={{ pathname: "/docs/[...slug]", query: { slug: ["tutorial", "getting-started"] } }}
          {...props}
        >
          {children}
        </Link>
      );
    }

    const isExternal = href?.startsWith("http");
    const extProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <Link href={href} {...extProps} {...props}>
        {children}
      </Link>
    );
  }
);
A.displayName = "Anchor";

export default A;
