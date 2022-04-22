import { NextPage } from "next";
import Image from "next/image";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";
import Input from "@client/components/forms/input";
import OrHr from "@client/components/orHr";
import AuthLayout from "@client/layouts/auth";

import logo from "@client/public/images/logo.svg";

const SignUp: NextPage = () => (
  <AuthLayout title="Sign up with email">
    <div className="text-center">
      <A href="/" notStyled>
        <Image src={logo} alt="Logo" width={80} height={80} />
      </A>
      <h1 className="text-3xl mt-6 mb-12">Create a new account</h1>
      <div className="flex flex-col gap-6">
        <form className="flex flex-col gap-3 w-full">
          <Input icon={EmailOutlinedIcon} placeholder="Email" type="email" required />
          <Input icon={KeyOutlinedIcon} placeholder="Password" type="password" required />
          <Input icon={KeyOutlinedIcon} placeholder="Confirm password" type="password" required />
          <Button>Create a new account</Button>
        </form>
        <OrHr className="my-0" />
        <Button variant="tertiary" href="/app/auth/signup">
          Other sign up options
        </Button>
      </div>
    </div>
  </AuthLayout>
);

export default SignUp;
