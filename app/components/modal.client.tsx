"use client";

import clsx from "clsx";

export type Props = React.ComponentProps<"div"> & {
  isVisible?: boolean;
  onOutsideClick?: React.MouseEventHandler<HTMLDivElement>;
};

/**
 * A modal. Well, what else can I say?
 *
 * @param params.isVisible Whether the modal is visible
 * @param params.onOutsideClick The event handler that is called whenever the area outside the
 * modal is clicked. For best UX, use this to close the modal.
 * @param params.children The content of the modal. Can be quite literally anything. Recommended
 * that this children have a `max-width` CSS property.
 */
export default function Modal({ isVisible, onOutsideClick, children, ...rest }: Props) {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 grid place-items-center bg-card bg-opacity-90 dark:bg-opacity-90 transition duration-300",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onOutsideClick}
    >
      <div
        className={clsx(
          "bg-card border rounded border-card transition duration-300",
          isVisible ? "translate-y-0" : "-translate-y-6"
        )}
        {...rest}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
