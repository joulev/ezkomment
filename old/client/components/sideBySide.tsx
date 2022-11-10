import clsx from "clsx";
import { FC, useEffect, useRef } from "react";

import { SideBySideProps } from "~/old/types/client/components.type";

/**
 * Create a resizable side-by-side component.
 *
 * @note I know this is not the Reactive way to do it - this is just plain HTML/JS baked into React
 * code. However it works and is easy to understand.
 *
 * @note I also know that this is not yet customisable. That is by design: I only write this for
 * the website and does not intend it to be used by others. I will add features only when I see a
 * need for it. Currently this component is used only in the customise page.
 *
 * @param props.left The left side of the side by side
 * @param props.right The right side of the side by side
 */
const SideBySide: FC<SideBySideProps> = ({ left, right }) => {
  const container = useRef<HTMLDivElement>(null);
  const leftDiv = useRef<HTMLDivElement>(null);
  const resizeBar = useRef<HTMLDivElement>(null);
  const resizeBarWidth = 24;
  useEffect(() => {
    if (!container.current || !leftDiv.current || !resizeBar.current) return;
    leftDiv.current.style.width =
      (container.current.getBoundingClientRect().width - resizeBarWidth) / 2 + "px";

    let isDragging = false;
    resizeBar.current.addEventListener("mousedown", () => (isDragging = true));
    container.current.addEventListener("mousemove", ({ clientX }) => {
      if (!isDragging || !container.current || !leftDiv.current || !resizeBar.current) return;
      const newLeftWidth = clientX - leftDiv.current.getBoundingClientRect().x - resizeBarWidth / 2;
      leftDiv.current.style.width = `${newLeftWidth}px`;
    });
    container.current.addEventListener("mouseup", () => (isDragging = false));
  }, [leftDiv, resizeBar]);
  return (
    <div ref={container} className="flex flex-row">
      {/* 49% to avoid content shift on load */}
      <div ref={leftDiv} className="min-w-[25%] w-[49%]">
        {left}
      </div>
      <div
        ref={resizeBar}
        className={clsx(
          "cursor-col-resize relative after:absolute after:w-3 after:h-full after:transition",
          "after:border-r-2 after:border-transparent after:hover:border-card"
        )}
        style={{ width: resizeBarWidth }}
      />
      <div className="flex-grow min-w-[25%]">{right}</div>
    </div>
  );
};

export default SideBySide;
