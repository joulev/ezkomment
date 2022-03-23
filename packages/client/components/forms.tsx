import clsx from "clsx";
import type { FC, ComponentProps } from "react";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";

type IconType = OverridableComponent<SvgIconTypeMap> & { muiName: string };

type InputWithUpdate = ComponentProps<"input"> & {
  type: ComponentProps<"input">["type"]; // make `type` required.
  onUpdate?: (value: string) => void;
};

type InputProps = InputWithUpdate &
  ({ label: string; icon?: IconType } | { icon: IconType; label?: string });

/**
 * A wrapper for the default `input` component, with styling from the design system and label
 * formatting.
 *
 * @param props.label The label in text
 * @param props.icon The icon to display on the left of the label
 * @param props.onUpdate A wrapper for onChange in the input element that helps access value directly
 * @param props.type The type of the `input` element. This is **mandatory** (compared to normal
 * `<input>` where it defaults to `"text"`)
 *
 * @note At least one of `label` or `icon` must be provided.
 *
 * @note Default `<input>` props are also supported. All of them will be passed directly to the
 * `<input>` component, therefore please be careful when using props such as `className`. It's
 * recommended that you don't add any additional styling with `className` at all.
 *
 * @note As a result, if you provide `onChange` directly, `onUpdate` will have no effect.
 */
export const Input: FC<InputProps> = ({ label, icon: Icon, onUpdate, ...props }) => {
  return (
    <label
      className={clsx(
        "flex flex-row-reverse rounded border",
        "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black"
      )}
    >
      <input
        onChange={onUpdate && (e => onUpdate(e.target.value))}
        className="peer px-3 py-1.5 bg-transparent w-full border-0 focus:ring-0"
        {...props}
      />
      <div
        className={clsx(
          "px-3 py-1.5 border-r flex flex-row gap-2 justify-center transition",
          "border-neutral-300 dark:border-neutral-700 shrink-0 text-neutral-500",
          "peer-focus:text-neutral-900 dark:peer-focus:text-neutral-100"
        )}
      >
        {Icon && <Icon />}
        {label && <span>{label}</span>}
      </div>
    </label>
  );
};
