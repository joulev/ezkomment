import clsx from "clsx";
import { ComponentProps, FC, ReactNode } from "react";

import { IconAndLabel, IconType } from "@client/types/utils.type";

import IconLabel from "../utils/iconAndLabel";

type InputProps = (ComponentProps<"input"> & IconAndLabel) & {
  type: ComponentProps<"input">["type"]; // make `type` required.
  onUpdate?: (value: string) => void;
};

type InputDetachedLabelProps = InputProps & {
  icon: IconType; // required
  helpText?: ReactNode;
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
const Input: FC<InputProps> = ({ label, icon, onUpdate, type, className, ...rest }) => (
  <label
    className={clsx(
      "group flex flex-row rounded border divide-x transition bg-card",
      "border-neutral-300 dark:border-neutral-700 divide-neutral-300 dark:divide-neutral-700",
      "focus-within:border-neutral-700 dark:focus-within:border-neutral-300",
      "focus-within:divide-neutral-700 dark:focus-within:divide-neutral-300",
      "hover:border-neutral-700 dark:hover:border-neutral-300",
      "hover:divide-neutral-700 dark:hover:divide-neutral-300",
      className
    )}
  >
    <IconLabel
      icon={icon}
      label={label}
      className={clsx(
        "px-3 py-1.5 transition shrink-0 text-muted cursor-pointer",
        "group-focus-within:text-neutral-900 dark:group-focus-within:text-neutral-100",
        "group-hover:text-neutral-900 dark:group-hover:text-neutral-100"
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

/**
 * A wrapper for the `Input` component to support outside-the-input-flex label and help text.
 *
 * @param props.label The label used.
 * @param props.helpText The help text. Default styling is `.text-sm.text-muted`.
 *
 * @note All props of `Input` are supported. However, `Input` also uses `label`, so `label` applied
 * on this component will be used by it and will **not** be passed to `Input`
 */
export const InputDetachedLabel: FC<InputDetachedLabelProps> = ({ label, helpText, ...rest }) => (
  <div className="flex flex-col gap-3">
    <div className="font-semibold">{label}</div>
    <Input {...rest} />
    {helpText && <div className="text-sm text-muted">{helpText}</div>}
  </div>
);

export default Input;
