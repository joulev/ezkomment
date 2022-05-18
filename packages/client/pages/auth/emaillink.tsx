import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

import useAuth from "@client/hooks/auth";
import { finaliseSignInEmailLink } from "@client/lib/firebase/auth";

import A from "@client/components/anchor";
import Banner from "@client/components/banner";
import UnknownError from "@client/components/unknownError";
import AuthLayout from "@client/layouts/auth";

import { NextPageWithLayout } from "@client/types/utils.type";

import logo from "@client/public/images/logo.svg";

const AuthEmailLinkAction: NextPageWithLayout = () => {
  const auth = useAuth();
  const [error, setError] = useState<ReactNode>(null);

  const finishSignInWithEmail = async () => {
    try {
      await finaliseSignInEmailLink(auth, window.location.href);
    } catch (err: any) {
      if (process.env.NODE_ENV === "development") console.log(err);
      if (err.code === "ezkomment/client") setError(err.message);
      else setError(<UnknownError err={err} />);
      auth.setLoading(false);
    }
  };
  useEffect(() => {
    finishSignInWithEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center">
      <A href="/" notStyled>
        <Image src={logo} alt="Logo" width={80} height={80} />
      </A>
      <h1 className="text-3xl mt-6 mb-12">Continue to ezkomment</h1>
      <div className="flex flex-col gap-6">
        {error && <Banner variant="error">{error}</Banner>}
        <p>Handling your email authentication link&hellip;</p>
      </div>
    </div>
  );
};

AuthEmailLinkAction.getLayout = page => <AuthLayout title="Authentication">{page}</AuthLayout>;

export default AuthEmailLinkAction;
