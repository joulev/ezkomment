import { FC, useEffect, useState } from "react";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import Banner from "~/client/components/banner";

import { ResponseMessage as Msg } from "~/types/client/utils.type";

const MsgBanner: FC<{ msg: NonNullable<Msg> }> = ({ msg }) => {
  const [show, setShow] = useState(true);
  useEffect(() => setShow(true), [msg]);
  if (!show) return null;
  return (
    <Banner
      variant={msg.type === "success" ? "info" : "error"}
      className="mb-6 flex flex-row items-start gap-3 pr-3"
    >
      <div className="flex-1">{msg.message}</div>
      <div>
        <button
          className="text-muted hover:text-neutral-900 dark:hover:text-neutral-100 transition"
          onClick={() => setShow(false)}
        >
          <CloseOutlinedIcon />
        </button>
      </div>
    </Banner>
  );
};

export default MsgBanner;
