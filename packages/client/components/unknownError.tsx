import { FC } from "react";

import A from "./anchor";

const UnknownError: FC<{ err: NodeJS.ErrnoException }> = ({ err }) => (
  <>
    An unknown error occurred. Please <A href="mailto:joulev.vvd@yahoo.com">report it to us</A> with
    the following error code: <code>{err.code}</code> and try again later.
  </>
);

export default UnknownError;
