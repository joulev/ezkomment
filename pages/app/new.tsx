import { FC } from "react";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import WebOutlinedIcon from "@mui/icons-material/LanguageOutlined";

import A from "~/client/components/anchor";
import Button from "~/client/components/buttons";
import { InputDetachedLabel } from "~/client/components/forms/input";
import AppLayout from "~/client/layouts/app";

import { NextPageWithLayout } from "~/types/client/utils.type";

const New: NextPageWithLayout = () => (
  <div className="mx-auto max-w-lg">
    <h1>Add a new site</h1>
    <p>
      A new site let you host comments for all webpages under any domain or subdomain.{" "}
      <A href="https://google.com">Should I create a new site or page?</A>
    </p>
    <form className="flex flex-col gap-6">
      <InputDetachedLabel
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
      <InputDetachedLabel
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
      <Button icon={AddOutlinedIcon}>Add a new site</Button>
    </form>
  </div>
);

const Loading: FC = () => (
  <div className="mx-auto max-w-lg">
    <div className="pulse h-9 w-48 mb-6" />
    <div className="pulse h-4 mb-3" />
    <div className="pulse h-4 mb-6" />
    <div className="pulse h-6 w-48 mb-3" />
    <div className="pulse h-9 mb-3" />
    <div className="pulse h-4 mb-3" />
    <div className="pulse h-4 mb-6" />
    <div className="pulse h-6 w-48 mb-3" />
    <div className="pulse h-9 mb-3" />
    <div className="pulse h-4 mb-3" />
    <div className="pulse h-4 mb-6" />
    <div className="pulse h-9 mb-3" />
  </div>
);

New.getLayout = page => (
  <AppLayout title="Add a new site" type="overview" activeTab="new" loadingScreen={<Loading />}>
    {page}
  </AppLayout>
);

export default New;
