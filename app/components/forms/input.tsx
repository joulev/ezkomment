import clsx from "clsx";
import IconLabel, { IconAndLabel } from "~/app/components/utils/icon-label.client";

export type Props = (React.ComponentProps<"input"> & IconAndLabel) & {
  type: React.ComponentProps<"input">["type"]; // make `type` required.
  isInvalid?: boolean;
  onUpdate?: (value: string) => void;
};

/**
 * A wrapper for the default `input` component, with styling from the design system and label
 * formatting.
 *
 * @param props.label The label in text
 * @param props.icon The icon to display on the left of the label
 * @param props.onUpdate A wrapper for onChange in the input element that helps access value directly
 * @param props.type The type of the `input` element. This is **mandatory** (compared to normal
 * `<input>` where it defaults to `"text"`)
 * @param props.className HTML classes to be applied to **the whole component**.
 *
 * @note At least one of `label` or `icon` must be provided.
 *
 * @note Default `<input>` props are also supported. All of them will be passed directly to the
 * `<input>` component.
 *
 * @note As a result, if you provide `onChange` directly, `onUpdate` will have no effect.
 */
export default function Input({
  label,
  icon,
  isInvalid,
  onUpdate,
  type,
  className,
  ...rest
}: Props) {
  return (
    <label
      className={clsx(
        "group flex flex-row rounded border divide-x transition bg-card border-card divide-card",
        "focus-within:border-muted focus-within:divide-muted hover:border-muted hover:divide-muted",
        isInvalid && "!border-red-500 !divide-red-500",
        className
      )}
    >
      <IconLabel
        icon={icon}
        label={label}
        className={clsx(
          "px-3 py-1.5 transition shrink-0 text-muted cursor-pointer",
          "group-focus-within:text-neutral-700 dark:group-focus-within:text-neutral-300",
          "group-hover:text-neutral-700 dark:group-hover:text-neutral-300"
        )}
      />
      <input
        type={type}
        onChange={onUpdate && (e => onUpdate(e.target.value))}
        className={clsx(
          "px-3 py-1.5 bg-transparent w-full border-0 focus:ring-0 transition placeholder:text-muted",
          type === "color" ? "cursor-pointer rounded-none h-9" : "cursor-text"
        )}
        {...rest}
      />
    </label>
  );
}
