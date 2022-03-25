import clsx from "clsx";
import { ComponentProps, FC } from "react";

import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";

type IconType = OverridableComponent<SvgIconTypeMap> & { muiName: string };

type SelectWithUpdate = ComponentProps<"select"> & { onUpdate?: (value: string) => void };

type SelectProps = SelectWithUpdate &
  ({ label: string; icon?: IconType } | { icon: IconType; label?: string });

/**
 * A wrapper for the default `select` component, with styling from the design system and label
 * formatting.
 *
 * @param props.label The label in text
 * @param props.icon The icon to display on the left of the label
 * @param props.onUpdate A wrapper for onChange in the input element that helps access value directly
 * @param props.className HTML classes to be applied to **the whole component**.
 *
 * @note At least one of `label` or `icon` must be provided.
 *
 * @note Default `<select>` props are also supported. All of them will be passed directly to the
 * `<select>` component.
 *
 * @note As a result, if you provide `onChange` directly, `onUpdate` will have no effect.
 */
const Select: FC<SelectProps> = ({ label, icon: Icon, onUpdate, className, children, ...rest }) => (
  <label
    className={clsx(
      "group flex flex-row rounded border divide-x transition bg-white dark:bg-black",
      "border-neutral-300 dark:border-neutral-700 divide-neutral-300 dark:divide-neutral-700",
      "focus-within:border-neutral-700 dark:focus-within:border-neutral-300",
      "focus-within:divide-neutral-700 dark:focus-within:divide-neutral-300",
      className
    )}
  >
    <div
      className={clsx(
        "px-3 py-1.5 flex flex-row gap-2 justify-center transition shrink-0 text-neutral-500",
        "group-focus-within:text-neutral-900 dark:group-focus-within:text-neutral-100"
      )}
    >
      {Icon && <Icon />}
      {label && <span>{label}</span>}
    </div>
    <select
      onChange={onUpdate && (e => onUpdate(e.target.value))}
      className="px-3 py-1.5 bg-transparent w-full border-0 focus:ring-0 transition"
      {...rest}
    >
      {children}
    </select>
  </label>
);

export default Select;
