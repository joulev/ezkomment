import clsx from "clsx";
import { FC } from "react";
import { useEffect, useState } from "react";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import { IconUploaderProps } from "~/types/client/components.type";

const IconUpload: FC<IconUploaderProps> = ({ label, helpText, onUpdate }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!image) {
      setImageSrc(undefined);
      return;
    }
    setImageSrc(URL.createObjectURL(image));
    if (onUpdate) onUpdate(image);
    return () => URL.revokeObjectURL(imageSrc!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

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
            <img
              src={imageSrc ?? "/images/default-photo.svg"}
              alt="Photo"
              className="w-18 h-18 md:w-24 md:h-24 rounded-full"
            />
          ) : (
            <div
              className={clsx(
                "w-18 h-18 md:w-24 md:h-24 rounded-full flex flex-col justify-center items-center transition",
                "border border-dashed border-card text-neutral-300 dark:text-neutral-700 hover:text-muted"
              )}
            >
              <AddOutlinedIcon fontSize="large" />
              <div className="hidden md:block text-xs">upload</div>
            </div>
          )}
          <input
            type="file"
            onChange={event => {
              if (
                !event.target.files ||
                event.target.files.length === 0 ||
                !(event.target.files[0] instanceof File) ||
                !/\.(jpe?g|png)$/i.test(event.target.files[0].name)
              )
                setImage(null);
              else setImage(event.target.files[0]);
            }}
            className="hidden"
            accept=".jpg, .jpeg, .png"
          />
        </label>
      </div>
    </div>
  );
};

export default IconUpload;
