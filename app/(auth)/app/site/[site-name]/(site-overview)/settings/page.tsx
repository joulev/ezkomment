"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertTriangle, HardDrive, Tag, Globe, Save } from "lucide-react";
import { SITE } from "~/misc/validate";
import { internalDelete, internalPut, internalPutNotJson } from "~/app/(auth)/internal-fetch";
import { UNABLE_TO_DELETE_SITE, UNABLE_TO_UPDATE_SITE } from "~/app/(auth)/errors";
import { useLoadingState } from "~/app/loading-state";
import { useSetToast } from "~/app/(auth)/toast";
import { useAuth } from "~/app/(auth)/app/user";
import { useSite } from "~/app/(auth)/app/site/[site-name]/site";
import A from "~/app/components/anchor.client";
import AuthError from "~/app/components/auth-error";
import Button from "~/app/components/buttons.client";
import CopiableCode from "~/app/components/copiable-code.client";
import IconUpload from "~/app/components/forms/icon-upload.client";
import Input from "~/app/components/forms/input";
import InputDetachedLabel from "~/app/components/forms/input-detached-label";
import Modal from "~/app/components/modal.client";
import RightAligned from "~/app/components/utils/right-aligned";

function UpdateSiteName() {
  const { mutate: mutateAuth } = useAuth();
  const { site, mutate: mutateSite } = useSite();
  const { setLoading } = useLoadingState();
  const setToast = useSetToast();
  const router = useRouter();
  const [name, setName] = useState(site.name);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const { success } = await internalPut(`/api/sites/${site.id}`, { name });
      if (!success) throw UNABLE_TO_UPDATE_SITE;
      await mutateAuth();
      mutateSite({ ...site, name });
      router.push(`/app/site/${name}/settings`);
      setToast({ type: "success", message: "Site name updated successfully." });
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
    }
    setLoading(false);
  };
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <InputDetachedLabel
        label="Site name"
        icon={Tag}
        type="text"
        value={name}
        isInvalid={!SITE.nameIsValid(name)}
        helpText="The site name helps identify your site in the dashboard and the URL."
        onUpdate={setName}
        required
      />
      <RightAligned>
        <Button icon={Save} disabled={name === site.name || !SITE.nameIsValid(name)}>
          Save
        </Button>
      </RightAligned>
    </form>
  );
}

function UpdateSiteDomain() {
  const { mutate: mutateAuth } = useAuth();
  const { site, mutate: mutateSite } = useSite();
  const { setLoading } = useLoadingState();
  const setToast = useSetToast();
  const [domain, setDomain] = useState(site.domain);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const { success } = await internalPut(`/api/sites/${site.id}`, { domain });
      if (!success) throw UNABLE_TO_UPDATE_SITE;
      await mutateAuth();
      mutateSite({ ...site, domain });
      setToast({ type: "success", message: "Domain updated successfully." });
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
    }
    setLoading(false);
  };
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <InputDetachedLabel
        label="Site domain"
        icon={Globe}
        type="text"
        value={domain}
        isInvalid={!SITE.domainIsValid(domain)}
        helpText="The domain is where you want to host the comments. It can be any domain or subdomain. Other websites will not be allowed to host the comments."
        onUpdate={setDomain}
        required
      />
      <RightAligned>
        <Button icon={Save} disabled={domain === site.domain || !SITE.domainIsValid(domain)}>
          Save
        </Button>
      </RightAligned>
    </form>
  );
}

function UploadSiteIcon() {
  const { mutate: mutateAuth } = useAuth();
  const { site, mutate: mutateSite } = useSite();
  const { setLoading } = useLoadingState();
  const setToast = useSetToast();
  const [icon, setIcon] = useState<File | null>(null);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (!icon) return;
    setLoading(true);
    try {
      const form = new FormData();
      form.append("icon", icon);
      const { success, body } = await internalPutNotJson(`/api/sites/${site.id}/icon`, form);
      if (!success) throw UNABLE_TO_UPDATE_SITE;
      const iconURL = (body.data as Record<string, string> | undefined)?.iconURL ?? "";
      await mutateAuth();
      mutateSite({ ...site, iconURL });
      setToast({ type: "success", message: "Site icon updated successfully." });
      setIcon(null);
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
    }
    setLoading(false);
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
        <Button icon={Save} disabled={!icon}>
          Save
        </Button>
      </RightAligned>
    </form>
  );
}

function ExportSiteData() {
  return (
    <section>
      <h2>Export all data</h2>
      <p>You can request all data related to this site to be exported as JSON.</p>
      <RightAligned>
        <Button icon={HardDrive}>Request data</Button>
      </RightAligned>
    </section>
  );
}

function DeleteSite() {
  const { mutate: mutateAuth } = useAuth();
  const { site } = useSite();
  const { setLoading } = useLoadingState();
  const setToast = useSetToast();
  const router = useRouter();
  const validPrompt = `delete ${site.name}`;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [promptText, setPromptText] = useState("");
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (!promptText || promptText !== validPrompt) return;
    setLoading(true);
    try {
      const { success } = await internalDelete(`/api/sites/${site.id}`);
      if (!success) throw UNABLE_TO_DELETE_SITE;
      router.push("/app/dashboard?loading=1");
      await mutateAuth();
      setToast({ type: "success", message: "Site deleted successfully." });
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
    }
    setLoading(false);
  };
  return (
    <section>
      <h2>Delete site</h2>
      <p>
        This is an <strong>irreversible</strong> action. All site data, including all comments and
        pages, will be completely erased and there is no way to recover it. All embed and API
        endpoints for the site will also stop working. Proceed with caution.
      </p>
      <RightAligned>
        <Button variant="danger" icon={AlertTriangle} onClick={() => setShowDeleteModal(true)}>
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
            To continue, type <strong>{validPrompt}</strong> to the text box below.
          </p>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <Input
              icon={Tag}
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
}

export default function AppSiteSettingsPage() {
  const { site } = useSite();
  return (
    <div className="grid md:grid-cols-2 gap-x-12">
      <div>
        <section>
          <h2>Basic information</h2>
          <div className="flex flex-col gap-12">
            <UpdateSiteName />
            <UpdateSiteDomain />
            <UploadSiteIcon />
          </div>
        </section>
        <hr className="md:hidden" />
      </div>
      <div>
        <section>
          <h2>Site ID</h2>
          <p>Your site ID is</p>
          <CopiableCode content={site.id} className="mb-6" />
          <p>
            You can use this to implement your own comment frontend based on the REST API provided
            by ezkomment. <A href="/docs/rest-api/introduction">See more in the documentation</A>.
          </p>
        </section>
        <hr />
        <ExportSiteData />
        <hr />
        <DeleteSite />
      </div>
    </div>
  );
}
