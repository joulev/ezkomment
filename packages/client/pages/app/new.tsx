import { NextPage } from "next";
import { ComponentProps, FC, ReactNode } from "react";

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

const New: NextPage = () => (
  <AppLayout title="Add a new site" type="overview" activeTab="new">
    <div className="mx-auto max-w-lg">
      <h1>Add a new site</h1>
      <p>
        A new site let you host comments for all webpages under any domain or subdomain.{" "}
        <A href="https://google.com">Should I create a new site or page?</A>
      </p>
      <form className="flex flex-col gap-6">
        <InputWithLabel
          label="Site name"
          type="text"
          icon={LabelOutlinedIcon}
          required
          helpText={
            <>
              The site name helps identify this site with other sites you also have. It can only
              contain lowercase letters, digits and hyphens. It must start with a letter.
            </>
          }
        />
        <InputWithLabel
          label="Site domain"
          type="text"
          icon={WebOutlinedIcon}
          required
          placeholder="example.com, mysite.example.com, &hellip;"
          helpText={
            <>
              The domain is where you want to host the comments. It can be any domain or subdomain.
              Other websites will not be allowed to host the comments.
            </>
          }
        />
        <Button>Add a new site</Button>
      </form>
    </div>
  </AppLayout>
);

export default New;
