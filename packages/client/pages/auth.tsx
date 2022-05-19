import Image from "next/image";
import { MouseEventHandler, ReactNode, useState } from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

import useAuth from "@client/hooks/auth";
import { signInGitHub, signInGoogle } from "@client/lib/firebase/auth";

import A from "@client/components/anchor";
import Banner from "@client/components/banner";
import Button from "@client/components/buttons";
import UnknownError from "@client/components/unknownError";
import AuthLayout from "@client/layouts/auth";

import { NextPageWithLayout } from "@client/types/utils.type";

import logo from "@client/public/images/logo.svg";

const Auth: NextPageWithLayout = () => {
  const auth = useAuth();
  const [error, setError] = useState<ReactNode>(null);

  const handleSignInWithGitHub: MouseEventHandler<HTMLElement> = async event => {
    event.preventDefault();
    try {
      await signInGitHub(auth);
    } catch (err: any) {
      if (process.env.NODE_ENV === "development") console.log(err);
      switch (err.code) {
        case "auth/popup-blocked":
          setError("The popup is blocked. Please disable your popup locker and try again.");
          break;
        case "auth/popup-closed-by-user":
          setError(
            "The popup was closed by the user before completing the sign in process. Please try again."
          );
          break;
        case "auth/account-exists-with-different-credential":
          setError(
            "An account already exists with the same email address but different sign-in credentials. Please try again using a provider associated with this email address."
          );
          break;
        default:
          setError(<UnknownError err={err} />);
      }
      auth.setLoading(false);
    }
  };

  const handleSignInWithGoogle: MouseEventHandler<HTMLElement> = async event => {
    event.preventDefault();
    try {
      await signInGoogle(auth);
    } catch (err) {
      if (process.env.NODE_ENV === "development") console.log(err);
      setError("Signing in with Google failed.");
      auth.setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <A href="/" notStyled>
        <Image src={logo} alt="Logo" width={80} height={80} />
      </A>
      <h1 className="text-3xl mt-6 mb-12">Continue to ezkomment</h1>
      <div className="flex flex-col gap-6">
        {error && <Banner variant="error">{error}</Banner>}
        <Button icon={GitHubIcon} onClick={handleSignInWithGitHub}>
          Continue with GitHub
        </Button>
        <Button icon={GoogleIcon} onClick={handleSignInWithGoogle}>
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

Auth.getLayout = page => <AuthLayout title="Authentication">{page}</AuthLayout>;

export default Auth;
