import Image from "next/image";

import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

import useAuth from "@client/hooks/auth";
import { signInGitHub } from "@client/lib/firebase/auth";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";
import OrHr from "@client/components/orHr";
import AuthLayout from "@client/layouts/auth";

import { NextPageWithLayout } from "@client/types/utils.type";

import logo from "@client/public/images/logo.svg";

const SignUp: NextPageWithLayout = () => {
  const auth = useAuth();
  return (
    <div className="text-center">
      <A href="/" notStyled>
        <Image src={logo} alt="Logo" width={80} height={80} />
      </A>
      <h1 className="text-3xl mt-6 mb-12">Create a new account</h1>
      <div className="flex flex-col gap-6">
        <Button icon={GitHubIcon} onClick={() => signInGitHub(auth)}>
          Continue with GitHub
        </Button>
        <Button icon={GoogleIcon} disabled>
          Continue with Google
        </Button>
        <OrHr className="my-0" />
        <Button variant="tertiary" href="/auth/create">
          Sign up with email
        </Button>
      </div>
    </div>
  );
};

SignUp.getLayout = page => <AuthLayout title="Sign up">{page}</AuthLayout>;

export default SignUp;
