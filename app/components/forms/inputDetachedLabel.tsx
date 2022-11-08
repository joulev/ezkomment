import { Icon } from "lucide-react";
import Input, { Props as InputProps } from "./input";

export type Props = InputProps & {
  icon: Icon; // required
  helpText?: React.ReactNode;
};

/**
 * A wrapper for the `Input` component to support outside-the-input-flex label and help text.
 *
 * @param props.label The label used.
 * @param props.helpText The help text. Default styling is `.text-sm.text-muted`.
 *
 * @note All props of `Input` are supported. However, `Input` also uses `label`, so `label` applied
 * on this component will be used by it and will **not** be passed to `Input`
 */
export default function InputDetachedLabel({ label, helpText, ...rest }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="font-semibold">{label}</div>
      <Input {...rest} />
      {helpText && <div className="text-sm text-muted">{helpText}</div>}
    </div>
  );
}
