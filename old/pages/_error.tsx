import { NextPage } from "next";

import { ErrorLayout } from "~/old/client/layouts/errors";

const Error: NextPage<{ code?: number }> = ({ code }) => <ErrorLayout code={code} />;

Error.getInitialProps = ({ res, err }) => {
  const code = res ? res.statusCode : err ? err.statusCode : 404;
  return { code };
};

export default Error;
