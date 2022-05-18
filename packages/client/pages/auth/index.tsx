import Image from "next/image";
import { FormEventHandler, MouseEventHandler, ReactNode, useState } from "react";

import EmailIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

import useAuth from "@client/hooks/auth";
import { signInEmailLink, signInGitHub, signInGoogle } from "@client/lib/firebase/auth";

import A from "@client/components/anchor";
import Banner from "@client/components/banner";
import Button from "@client/components/buttons";
import Input from "@client/components/forms/input";
import OrHr from "@client/components/orHr";
import AuthLayout from "@client/layouts/auth";

import { NextPageWithLayout } from "@client/types/utils.type";

import logo from "@client/public/images/logo.svg";

const Auth: NextPageWithLayout = () => {
  const auth = useAuth();
  const [error, setError] = useState<ReactNode>(null);
  const [email, setEmail] = useState("");
  const [showEmailLinkInfo, setShowEmailLinkInfo] = useState(false);

  const handleSignInWithGitHub: MouseEventHandler<HTMLElement> = async event => {
    event.preventDefault();
    try {
      await signInGitHub(auth);
    } catch (err: any) {
      if (process.env.NODE_ENV === "development") console.log(err);
      switch (err.code) {
        case "auth/popup-blocked":
          setError(
            "The popup is blocked. Please disable your popup locker and try again, or use email-based authentication."
          );
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
          setError(
            <>
              An unknown error occurred. Please{" "}
              <A href="mailto:joulev.vvd@yahoo.com">report it to us</A> with the following error
              code: <code>{err.code}</code> and try again later.
            </>
          );
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

  const handleSignInWithEmailLink: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    try {
      await signInEmailLink(auth, email);
      setShowEmailLinkInfo(true);
    } catch (err) {
      if (process.env.NODE_ENV === "development") console.log(err);
      setError("Signing in with email link failed.");
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
        {showEmailLinkInfo && (
          <Banner variant="info">A link to sign in has been sent to your email account.</Banner>
        )}
        <Button icon={GitHubIcon} onClick={handleSignInWithGitHub}>
          Continue with GitHub
        </Button>
        <Button icon={GoogleIcon} onClick={handleSignInWithGoogle}>
          Continue with Google
        </Button>
        <OrHr className="my-0" />
        <form className="flex flex-col gap-3 w-full" onSubmit={handleSignInWithEmailLink}>
          <Input icon={EmailIcon} placeholder="Email" type="email" required onUpdate={setEmail} />
          <Button>Sign in with email</Button>
        </form>
      </div>
    </div>
  );
};

Auth.getLayout = page => <AuthLayout title="Authentication">{page}</AuthLayout>;

export default Auth;
