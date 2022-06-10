import clsx from "clsx";
import Link from "next/link";
import { forwardRef } from "react";

import { HyperlinkProps } from "~/types/components.type";

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
    if (!href) {
      return (
        <a className={clsx(notStyled || "a", className)} ref={ref} {...rest}>
          {children}
        </a>
      );
    }
    if (href[0] === "/") {
      return (
        <Link href={href}>
          <a className={clsx(notStyled || "a", className)} ref={ref} {...rest}>
            {children}
          </a>
        </Link>
      );
    }
    if (href[0] === "#") {
      return (
        <a href={href} className={clsx(notStyled || "a", className)} ref={ref} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(notStyled || "a", className)}
        ref={ref}
        {...rest}
      >
        {children}
      </a>
    );
  }
);
A.displayName = "Anchor";

export default A;
