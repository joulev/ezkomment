import clsx from "clsx";

export type Props = React.PropsWithChildren<{ className?: string }>;

/**
 * Make the component right-aligned. Intended to use in form buttons.
 *
 * @param props.className Additional classes to be added to the component (if any)
 * @param props.children A React node used as the content of the component
 */
export default function RightAligned({ className, children }: Props) {
  return <div className={clsx("flex flex-row justify-end", className)}>{children}</div>;
}
