import { useRouter } from "next/router";
import { FC, FormEventHandler, useState } from "react";
import isSlug from "validator/lib/isSlug";
import isURL from "validator/lib/isURL";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import WebOutlinedIcon from "@mui/icons-material/LanguageOutlined";

import * as E from "~/client/lib/errors";
import useAuth from "~/client/hooks/auth";
import { internalFetcher } from "~/client/lib/fetcher";

import A from "~/client/components/anchor";
import AuthError from "~/client/components/auth/error";
import Button from "~/client/components/buttons";
import { InputDetachedLabel } from "~/client/components/forms/input";
import MsgBanner from "~/client/components/messageBanner";
import AppLayout from "~/client/layouts/app";

import { ResponseMessage as Msg, NextPageWithLayout } from "~/types/client/utils.type";

const New: NextPageWithLayout = () => {
  const { user, setLoading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [msg, setMsg] = useState<Msg>(null);

  const nameIsValid = () => isSlug(name);
  const domainIsValid = () => isURL(domain, { require_protocol: true });

  const createNewSite = async (name: string, domain: string) => {
    setLoading(true);
    if (!user) throw E.NOT_AUTHENTICATED;
    const { success } = await internalFetcher({
      url: `/api/users/${user.uid}/sites`,
      method: "POST",
      options: { body: JSON.stringify({ name, domain }) },
    });
    if (!success) throw E.UNABLE_TO_CREATE_SITE;
    setLoading(false);
    router.push("/app/dashboard"); // TODO: redirect to the site dashboard instead
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (!nameIsValid() || !domainIsValid()) return;
    try {
      await createNewSite(name, domain);
    } catch (err: any) {
      setMsg({ type: "error", message: <AuthError err={err} /> });
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto md:max-w-lg">
      <h1>Add a new site</h1>
      <p>
        A new site let you host comments for all webpages under any domain or subdomain.{" "}
        <A href="https://google.com">Should I create a new site or page?</A>
      </p>
      {msg && <MsgBanner msg={msg} />}
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <InputDetachedLabel
          label="Site name"
          type="text"
          icon={LabelOutlinedIcon}
          required
          value={name}
          onChange={event => setName(event.target.value)}
          isInvalid={(name.length > 0 || domain.length > 0) && !nameIsValid()}
          helpText={
            <>
              The site name helps identify this site with other sites you also have. It can only
              contain lowercase letters, digits and hyphens. It must start with a letter and be at
              least 3 characters long.
            </>
          }
        />
        <InputDetachedLabel
          label="Site hostname"
          type="text"
          icon={WebOutlinedIcon}
          required
          value={domain}
          onChange={event => setDomain(event.target.value)}
          isInvalid={(name.length > 0 || domain.length > 0) && !domainIsValid()}
          placeholder="https://example.com, https://mysite.example.com, &hellip;"
          helpText={
            <>
              The hostname of the website where you want to host the comments. It can be any domain
              or subdomain with a valid protocol. Other websites{" "}
              <A href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors">
                will not be allowed to host the comments
              </A>
              .
            </>
          }
        />
        <Button icon={AddOutlinedIcon} disabled={!(nameIsValid() && domainIsValid())}>
          Add a new site
        </Button>
      </form>
    </div>
  );
};

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
