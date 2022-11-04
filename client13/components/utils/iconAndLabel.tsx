"use client";

import clsx from "clsx";
import { IconAndLabelProps } from "~/types/client/components.type";

/**
 * Consistently place a MUI icon in front of a label
 *
 * @param props.label The label in text
 * @param props.icon The icon to display on the left of the label
 * @param props.className HTML classes to be applied to **the whole component**.
 */
export default function IconLabel({ icon: Icon, label, className }: IconAndLabelProps) {
  return (
    <div className={clsx("flex flex-row gap-2 justify-center", className)}>
      {Icon && <Icon />}
      {label && <span>{label}</span>}
    </div>
  );
}
