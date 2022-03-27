import clsx from "clsx";
import { NextPage } from "next";
import { ComponentProps, FC, ReactNode } from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import WebOutlinedIcon from "@mui/icons-material/LanguageOutlined";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";
import Input from "@client/components/forms/input";
import AppLayout from "@client/layouts/app";

import { IconType } from "@client/types/utils.type";

type InputWithLabelProps = ComponentProps<typeof Input> & { icon: IconType; helpText?: ReactNode };

const InputWithLabel: FC<InputWithLabelProps> = ({ label, helpText, ...rest }) => (
  <div className="flex flex-col gap-3">
    <div className="font-semibold">{label}</div>
    <Input {...rest} />
    {helpText && <div className="text-sm text-neutral-500">{helpText}</div>}
  </div>
);

const RightAligned: FC = ({ children }) => (
  <div className="flex flex-row justify-end">{children}</div>
);

const New: NextPage = () => (
  <AppLayout title="Account settings" type="overview" activeTab="account">
    <div className="grid md:grid-cols-2 gap-x-12">
      <div>
        <h2>Profile</h2>
        <p>
          An up-to-date information here will help others identify you in comments, as well as help
          us help you with technical details and issues.
        </p>
        <div className="flex flex-col gap-6">
          <InputWithLabel
            label="Display name"
            icon={LabelOutlinedIcon}
            type="text"
            value="John Doe"
            helpText="Your name is displayed in your replies to comments."
          />
          <InputWithLabel
            label="Email address"
            icon={WebOutlinedIcon}
            type="email"
            value="john.doe@example.com"
            helpText="Your email address is used for logging in and recovering your account."
          />
        </div>
        <hr />
        <h2>Link accounts</h2>
        <p>
          Your account is currently linked with the following services, and you can use these to log
          in to your account instead of using one-time links sent to your email address.
        </p>
        <div
          className={clsx(
            "flex flex-col bg-white dark:bg-black rounded overflow-hidden",
            "border border-neutral-300 dark:border-neutral-700",
            "divide-y divide-neutral-300 dark:divide-neutral-700"
          )}
        >
          <div className="flex flex-row p-6 gap-x-6 items-center">
            <GitHubIcon fontSize="large" />
            <A
              notStyled
              href="https://github.com/joulev"
              className="text-neutral-500 hover:underline underline-offset-4"
            >
              @joulev
            </A>
            <div className="flex-grow" />
            <Button>Delink</Button>
          </div>
        </div>
        <hr className="md:hidden" />
      </div>
      <div>
        <h2>Export all data</h2>
        <p>
          You can request all of your data to be exported to a CSV file. This includes your
          comments, your replies to comments, and your posts, here.
        </p>
        <p>You can only perform this action once a day.</p>
        <RightAligned>
          <Button>Request data</Button>
        </RightAligned>
        <hr />
        <h2>Delete account</h2>
        <p>
          This is an <strong>irreversible</strong> action. All of your data will be completely
          erased and there is no way to recover it. Proceed with caution.
        </p>
        <RightAligned>
          <Button>Delete my account</Button>
        </RightAligned>
      </div>
    </div>
  </AppLayout>
);

export default New;
