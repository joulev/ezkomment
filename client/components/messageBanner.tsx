import { FC } from "react";

import Banner from "~/client/components/banner";

import { ResponseMessage as Msg } from "~/types/client/utils.type";

const MsgBanner: FC<{ msg: NonNullable<Msg> }> = ({ msg }) => (
  <Banner variant={msg.type === "success" ? "info" : "error"} className="mb-6">
    {msg.message}
  </Banner>
);

export default MsgBanner;
