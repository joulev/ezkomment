import clsx from "clsx";
import { NextPage } from "next";
import Image from "next/image";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";
import Input from "@client/components/forms/input";
import OrHr from "@client/components/orHr";
import AuthLayout from "@client/layouts/auth";

const SignUp: NextPage = () => (
  <AuthLayout title="Sign in">
    <div className="text-center">
      <A href="/" notStyled>
        <Image src="/images/logo.svg" alt="Logo" width={80} height={80} />
      </A>
      <h1 className="text-3xl mt-6 mb-12">Sign in to ezkomment</h1>
      <div className="flex flex-col gap-6">
        <Button icon={GitHubIcon} href="/app/dashboard">
          Continue with GitHub
        </Button>
        <Button icon={GoogleIcon} href="/app/dashboard">
          Continue with Google
        </Button>
        <OrHr className="my-0" />
        <form className="flex flex-col gap-3 w-full">
          <Input icon={EmailOutlinedIcon} placeholder="Email" type="email" required />
          <Input icon={KeyOutlinedIcon} placeholder="Password" type="password" required />
          <Button className="mt-3">Sign in with email</Button>
        </form>
      </div>
    </div>
  </AuthLayout>
);

export default SignUp;
