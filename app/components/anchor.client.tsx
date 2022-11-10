"use client";

import clsx from "clsx";
import Link from "next/link";
import { forwardRef } from "react";

export type Props = React.ComponentProps<"a"> & {
  notStyled?: boolean;
};

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
const A = forwardRef<HTMLAnchorElement, Props>(({ href, notStyled, className, ...rest }, ref) => {
  const cls = clsx(notStyled || "a", className);
  const props = { href, className: cls, ...rest, ref };

  if (!href || href.startsWith("#")) return <a {...props} />;
  if (href.startsWith("http")) return <a target="_blank" rel="noopener noreferrer" {...props} />;

  return <Link {...props} href={href} />;
});
A.displayName = "Anchor";

export default A;
