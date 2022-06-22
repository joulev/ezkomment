import { useRouter } from "next/router";
import { FC, FormEventHandler, useState } from "react";

import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import WebOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { SITE } from "~/misc/validate";

import useAuth from "~/client/hooks/auth";
import { useSite } from "~/client/hooks/site";
import { UNABLE_TO_DELETE_SITE, UNABLE_TO_UPDATE_SITE } from "~/client/lib/errors";
import { internalFetcher } from "~/client/lib/fetcher";
import { refreshUser } from "~/client/lib/firebase/auth";

import A from "~/client/components/anchor";
import sitePages from "~/client/components/app/handleSite";
import AuthError from "~/client/components/auth/error";
import Button from "~/client/components/buttons";
import CopiableCode from "~/client/components/copiableCode";
import IconUpload from "~/client/components/forms/iconUpload";
import Input, { InputDetachedLabel } from "~/client/components/forms/input";
import MsgBanner from "~/client/components/messageBanner";
import Modal from "~/client/components/modal";
import RightAligned from "~/client/components/utils/rightAligned";

import { ResponseMessage as Msg } from "~/types/client/utils.type";
import { ClientSite } from "~/types/server";
import { ApiResponseBody } from "~/types/server/nextApi.type";

const LoadingSection: FC = () => (
  <section>
    <div className="h-8 w-36 pulse mb-6" />
    <div className="h-4 pulse mb-3" />
    <div className="h-4 pulse mb-3" />
    <div className="h-4 pulse mb-6" />
    <div className="h-6 w-48 pulse mb-3" />
    <div className="h-9 pulse mb-3" />
    <div className="h-4 pulse mb-6" />
    <div className="h-6 w-48 pulse mb-3" />
    <div className="h-9 pulse mb-3" />
    <div className="h-4 pulse mb-6" />
    <RightAligned>
      <div className="h-9 w-32 pulse" />
    </RightAligned>
  </section>
);

const Loading: FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
    <div>
      <LoadingSection />
      <hr />
      <LoadingSection />
      <hr className="md:hidden" />
    </div>
    <div>
      <LoadingSection />
      <hr />
      <LoadingSection />
    </div>
  </div>
);

const UpdateSiteName: FC<{ site: ClientSite; setMsg: (msg: Msg) => void }> = ({ site, setMsg }) => {
  const router = useRouter();
  const auth = useAuth();
  const { mutate } = useSite();
  const [name, setName] = useState(site.name);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    auth.setLoading(true);
    try {
      const { success } = await internalFetcher({
        url: `/api/sites/${site.id}`,
        method: "PUT",
        options: { body: JSON.stringify({ name }) },
      });
      if (!success) throw UNABLE_TO_UPDATE_SITE;
      router.replace(`/app/site/${name}/settings?loading=1`);
      await refreshUser(auth);
      mutate({ ...site, name });
    } catch (err: any) {
      setMsg({ type: "error", message: <AuthError err={err} /> });
    }
    auth.setLoading(false);
  };
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <InputDetachedLabel
        label="Site name"
        icon={LabelOutlinedIcon}
        type="text"
        value={name}
        isInvalid={!SITE.nameIsValid(name)}
        helpText="The site name helps identify your site in the dashboard and the URL."
        onUpdate={setName}
        required
      />
      <RightAligned>
        <Button icon={SaveOutlinedIcon} disabled={name === site.name || !SITE.nameIsValid(name)}>
          Save
        </Button>
      </RightAligned>
    </form>
  );
};

const UpdateSiteDomain: FC<{ site: ClientSite; setMsg: (msg: Msg) => void }> = ({
  site,
  setMsg,
}) => {
  const auth = useAuth();
  const { mutate } = useSite();
  const [domain, setDomain] = useState(site.domain);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    auth.setLoading(true);
    try {
      const { success } = await internalFetcher({
        url: `/api/sites/${site.id}`,
        method: "PUT",
        options: { body: JSON.stringify({ domain }) },
      });
      if (!success) throw UNABLE_TO_UPDATE_SITE;
      await refreshUser(auth);
      mutate({ ...site, domain });
      setMsg({ type: "success", message: "Domain updated successfully." });
    } catch (err: any) {
      setMsg({ type: "error", message: <AuthError err={err} /> });
    }
    auth.setLoading(false);
  };
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <InputDetachedLabel
        label="Site domain"
        icon={WebOutlinedIcon}
        type="text"
        value={domain}
        isInvalid={!SITE.domainIsValid(domain)}
        helpText="The domain is where you want to host the comments. It can be any domain or subdomain. Other websites will not be allowed to host the comments."
        onUpdate={setDomain}
        required
      />
      <RightAligned>
        <Button
          icon={SaveOutlinedIcon}
          disabled={domain === site.domain || !SITE.domainIsValid(domain)}
        >
          Save
        </Button>
      </RightAligned>
    </form>
  );
};

const UploadSiteIcon: FC<{ site: ClientSite; setMsg: (msg: Msg) => void }> = ({ site, setMsg }) => {
  const auth = useAuth();
  const { mutate } = useSite();
  const [icon, setIcon] = useState<File | null>(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (!icon) return;
    auth.setLoading(true);
    try {
      const form = new FormData();
      form.append("icon", icon);
      const { success, body } = await internalFetcher(
        { url: `/api/sites/${site.id}/icon`, method: "PUT", options: { body: form } },
        false
      );
      if (!success) throw UNABLE_TO_UPDATE_SITE;
      const iconURL =
        ((body as ApiResponseBody).data as Record<string, string> | undefined)?.iconURL ?? "";
      await refreshUser(auth);
      mutate({ ...site, iconURL });
      setMsg({ type: "success", message: "Site icon updated successfully." });
      setIcon(null);
    } catch (err: any) {
      setMsg({ type: "error", message: <AuthError err={err} /> });
    }
    auth.setLoading(false);
  };
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <IconUpload
        label="Site icon"
        helpText="This icon helps you identify this site over other sites you also have."
        file={icon}
        onUpdate={setIcon}
      />
      <RightAligned>
        <Button icon={SaveOutlinedIcon} disabled={!icon}>
          Save
        </Button>
      </RightAligned>
    </form>
  );
};

const UpdateSite: FC<{ site: ClientSite }> = ({ site }) => {
  const [msg, setMsg] = useState<Msg>(null);
  return (
    <section>
      <h2>Basic information</h2>
      {msg && <MsgBanner msg={msg} />}
      <div className="flex flex-col gap-12">
        <UpdateSiteName site={site} setMsg={setMsg} />
        <UpdateSiteDomain site={site} setMsg={setMsg} />
        <UploadSiteIcon site={site} setMsg={setMsg} />
      </div>
    </section>
  );
};

const DeleteSite: FC<{ site: ClientSite }> = ({ site }) => {
  const router = useRouter();
  const auth = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [msg, setMsg] = useState<Msg>(null);
  const validPrompt = `delete ${site.name}`;
  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (!promptText || promptText !== validPrompt) return;
    auth.setLoading(true);
    try {
      const { success } = await internalFetcher({ url: `/api/sites/${site.id}`, method: "DELETE" });
      if (!success) throw UNABLE_TO_DELETE_SITE;
      router.replace("/app/dashboard?loading=1");
      await refreshUser(auth);
    } catch (err: any) {
      setMsg({ type: "error", message: <AuthError err={err} /> });
    }
    auth.setLoading(false);
  };
  return (
    <section>
      <h2>Delete site</h2>
      {msg && <MsgBanner msg={msg} />}
      <p>
        This is an <strong>irreversible</strong> action. All site data, including all comments and
        pages, will be completely erased and there is no way to recover it. All embed and API
        endpoints for the site will also stop working. Proceed with caution.
      </p>
      <RightAligned>
        <Button
          variant="danger"
          icon={DangerousOutlinedIcon}
          onClick={() => setShowDeleteModal(true)}
        >
          Delete this site
        </Button>
      </RightAligned>
      <Modal isVisible={showDeleteModal} onOutsideClick={() => setShowDeleteModal(false)}>
        <div className="p-6 max-w-lg">
          <h2>You are attempting a dangerous action.</h2>
          <p>
            Deleting a site is <strong>irreversible</strong>, and we cannot do anything to recover
            any data related to the site. Please think twice before proceeding.
          </p>
          <p>
            To continue, type <strong>delete {site.name}</strong> to the text box below.
          </p>
          {msg && <MsgBanner msg={msg} />}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <Input
              icon={LabelOutlinedIcon}
              type="text"
              required
              isInvalid={promptText !== "" && promptText !== validPrompt}
              value={promptText}
              onUpdate={setPromptText}
            />
            <RightAligned className="gap-3">
              <Button type="button" variant="tertiary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="danger" disabled={promptText !== validPrompt}>
                Delete
              </Button>
            </RightAligned>
          </form>
        </div>
      </Modal>
    </section>
  );
};

const Content: FC = () => {
  const { site } = useSite();
  if (!site) return <Loading />;
  return (
    <div className="grid md:grid-cols-2 gap-x-12">
      <div>
        <UpdateSite site={site} />
        <hr className="md:hidden" />
      </div>
      <div>
        <section>
          <h2>Site ID</h2>
          <p>Your site ID is</p>
          <CopiableCode content={site.id} className="mb-6" />
          <p>
            You can use this to implement your own comment frontend based on the REST API provided
            by ezkomment. <A href="https://google.com">See more in the documentation</A>.
          </p>
        </section>
        <hr />
        <section>
          <h2>Export all data</h2>
          <p>
            You can request all data related to this site to be exported. You can only perform this
            action once a day.
          </p>
          <RightAligned>
            <Button icon={DnsOutlinedIcon}>Request data</Button>
          </RightAligned>
        </section>
        <hr />
        <DeleteSite site={site} />
      </div>
    </div>
  );
};

const SiteOverview = sitePages({
  title: siteName => `Settings | ${siteName}`,
  activeTab: "settings",
  Loading,
  Content,
});

export default SiteOverview;
