import clsx from "clsx";
import { NextPage } from "next";
import Image from "next/image";

import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";
import OrHr from "@client/components/orHr";
import AuthLayout from "@client/layouts/auth";

const SignUp: NextPage = () => (
  <AuthLayout title="Sign up">
    <div className="text-center">
      <A href="/" notStyled>
        <Image src="/images/logo.svg" alt="Logo" width={80} height={80} />
      </A>
      <h1 className="text-3xl mt-6 mb-12">Create a new account</h1>
      <div className="flex flex-col gap-6">
        <Button icon={GitHubIcon} href="/app/dashboard">
          Continue with GitHub
        </Button>
        <Button icon={GoogleIcon} href="/app/dashboard">
          Continue with Google
        </Button>
        <OrHr className="my-0" />
        <Button variant="tertiary" href="/app/auth/create">
          Sign up with email
        </Button>
      </div>
    </div>
  </AuthLayout>
);

export default SignUp;
