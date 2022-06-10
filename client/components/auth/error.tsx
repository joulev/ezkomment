import { FC } from "react";

import A from "~/client/components/anchor";

const AuthError: FC<{ err: NodeJS.ErrnoException }> = ({ err }) => {
  if (process.env.NODE_ENV === "development") console.log(err);
  switch (err.code) {
    case "ezkomment/client":
      return <>{err.message}</>;
    case "auth/popup-blocked":
      return <>The popup is blocked. Please disable your popup blocker and try again.</>;
    case "auth/popup-closed-by-user":
      return (
        <>
          The popup was closed by the user before completing the sign in process. Please try again.
        </>
      );
    case "auth/account-exists-with-different-credential":
      return (
        <>
          An account already exists with the same email address but different sign-in credentials.
          Please try again using a provider associated with this email address.
        </>
      );
    case "auth/account-exists-with-different-credential":
      return (
        <>
          An account already exists with the same email address but different sign-in credentials,
          hence linking is not allowed.
        </>
      );
    case "auth/email-already-in-use":
      return (
        <>
          The account&apos;s primary email address is already used in another account, hence linking
          is not allowed.
        </>
      );
    default:
      return (
        <>
          An unknown error occurred. Please{" "}
          <A href="mailto:joulev.vvd@yahoo.com">report it to us</A> with the following error code:{" "}
          <code>{err.code}</code> and try again later.
        </>
      );
  }
};

export default AuthError;
