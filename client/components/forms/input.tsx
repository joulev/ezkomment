import clsx from "clsx";
import { FC } from "react";

import IconLabel from "~/client/components/utils/iconAndLabel";

import { InputDetachedLabelProps, InputProps } from "~/types/client/components.type";

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
      "group flex flex-row rounded border divide-x transition bg-card border-card divide-card",
      "focus-within:border-muted focus-within:divide-muted hover:border-muted hover:divide-muted",
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
