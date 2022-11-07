"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

export type Props = {
  label: string;
  helpText: React.ReactNode;
  file: File | null;
  onUpdate?: (file: File | null) => void;
};

export default function IconUpload({ label, helpText, file, onUpdate }: Props) {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!file) {
      setImageSrc(undefined);
      return;
    }
    setImageSrc(URL.createObjectURL(file));
    return () => URL.revokeObjectURL(imageSrc!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  return (
    <div className="flex flex-row items-start gap-6">
      <div className="flex-grow">
        <div className="font-semibold mb-3">{label}</div>
        <div>{helpText}</div>
      </div>
      <div className="min-w-min">
        <label className="cursor-pointer block w-18 md:w-24 overflow-hidden">
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageSrc} alt="Photo" className="w-18 h-18 md:w-24 md:h-24 rounded-full" />
          ) : (
            <div
              className={clsx(
                "w-18 h-18 md:w-24 md:h-24 rounded-full flex flex-col justify-center items-center transition",
                "border border-dashed border-card text-neutral-300 dark:text-neutral-700 hover:text-muted"
              )}
            >
              <Plus />
              <div className="hidden md:block text-xs">upload</div>
            </div>
          )}
          <input
            type="file"
            onChange={event => {
              if (!onUpdate) return;
              if (
                !event.target.files ||
                event.target.files.length === 0 ||
                !(event.target.files[0] instanceof File) ||
                !/\.(jpe?g|png)$/i.test(event.target.files[0].name)
              )
                onUpdate(null);
              else onUpdate(event.target.files[0]);
            }}
            className="hidden"
            accept=".jpg, .jpeg, .png"
          />
        </label>
      </div>
    </div>
  );
}
