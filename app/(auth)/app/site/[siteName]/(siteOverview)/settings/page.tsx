"use client";

import { useState } from "react";
import { AlertTriangle, HardDrive, Tag, Globe, Save } from "lucide-react";
import { SITE } from "~/misc/validate";
import { useSite } from "~/app/(auth)/app/site/[siteName]/site";
import A from "~/app/components/anchor.client";
import Button from "~/app/components/buttons.client";
import CopiableCode from "~/app/components/copiable-code.client";
import IconUpload from "~/app/components/forms/icon-upload.client";
import Input from "~/app/components/forms/input";
import InputDetachedLabel from "~/app/components/forms/input-detached-label";
import Modal from "~/app/components/modal.client";
import RightAligned from "~/app/components/utils/right-aligned";

function UpdateSiteName() {
  const { site } = useSite();
  const [name, setName] = useState(site.name);
  return (
    <form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
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
  const { site } = useSite();
  const [domain, setDomain] = useState(site.domain);
  return (
    <form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
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
  const [icon, setIcon] = useState<File | null>(null);
  return (
    <form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
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
  const { site } = useSite();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [promptText, setPromptText] = useState("");
  const validPrompt = `delete ${site.name}`;
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
          <form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
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
