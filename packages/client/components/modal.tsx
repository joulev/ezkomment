import clsx from "clsx";
import { FC, MouseEventHandler, ReactNode } from "react";

/**
 * A modal. Well, what else can I say?
 *
 * @param params.isVisible Whether the modal is visible
 * @param params.onOutsideClick The event handler that is called whenever the area outside the
 * modal is clicked. For best UX, use this to close the modal.
 * @param params.children The content of the modal. Can be quite literally anything. Recommended
 * that this children have a `max-width` CSS property.
 */
const Modal: FC<{
  isVisible?: boolean;
  onOutsideClick?: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}> = ({ isVisible, onOutsideClick, children }) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 grid place-items-center bg-neutral-500 bg-opacity-50 transition",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onOutsideClick}
    >
      <div
        className={clsx(
          "bg-white dark:bg-black border rounded border-neutral-500 transition",
          isVisible ? "translate-y-0" : "-translate-y-6"
        )}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
