import Image from "next/image";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

import useAuth from "@client/hooks/auth";
import { signInGitHub } from "@client/lib/firebase/auth";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";
import Input from "@client/components/forms/input";
import OrHr from "@client/components/orHr";
import AuthLayout from "@client/layouts/auth";

import { NextPageWithLayout } from "@client/types/utils.type";

import logo from "@client/public/images/logo.svg";

const Auth: NextPageWithLayout = () => {
  const auth = useAuth();
  return (
    <div className="text-center">
      <A href="/" notStyled>
        <Image src={logo} alt="Logo" width={80} height={80} />
      </A>
      <h1 className="text-3xl mt-6 mb-12">Continue to ezkomment</h1>
      <div className="flex flex-col gap-6">
        <Button icon={GitHubIcon} onClick={() => signInGitHub(auth)}>
          Continue with GitHub
        </Button>
        <Button icon={GoogleIcon} disabled>
          Continue with Google
        </Button>
        <OrHr className="my-0" />
        <form className="flex flex-col gap-3 w-full">
          <Input icon={EmailOutlinedIcon} placeholder="Email" type="email" required />
          <Button disabled>Sign in with email</Button>
        </form>
      </div>
    </div>
  );
};

Auth.getLayout = page => <AuthLayout title="Authentication">{page}</AuthLayout>;

export default Auth;
