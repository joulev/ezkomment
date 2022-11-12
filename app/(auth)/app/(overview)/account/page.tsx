"use client";

import { useState } from "react";
import { AlertTriangle, HardDrive, User, Save, Trash } from "lucide-react";
import { useUser } from "~/app/(auth)/app/user";
import { useBreakpoint } from "~/app/breakpoint";
import Banner from "~/app/components/banner";
import Button from "~/app/components/buttons.client";
import CopiableCode from "~/app/components/copiable-code.client";
import IconUpload from "~/app/components/forms/icon-upload.client";
import InputDetachedLabel from "~/app/components/forms/input-detached-label";
import Modal from "~/app/components/modal.client";
import GitHubLogo from "~/app/(auth)/components/github-logo";
import GoogleLogo from "~/app/(auth)/components/google-logo";
import RightAligned from "~/app/components/utils/right-aligned";

function ProfileSection() {
  const user = useUser();
  const [displayName, setDisplayName] = useState(user.displayName ?? "");
  const [image, setImage] = useState<File | null>(null);

  return (
    <section>
      <h2>Profile</h2>
      <p>
        This display name helps us identify you. It is recommended to use your actual name as your
        display name (although that is not required).
      </p>
      {!user.displayName && (
        <Banner variant="warning" className="mb-6">
          You currently do not have a display name. It is recommended to have one.
        </Banner>
      )}
      <form className="flex flex-col gap-6 mb-12" onSubmit={e => e.preventDefault()}>
        <InputDetachedLabel
          label="Display name"
          placeholder="Your name"
          icon={User}
          type="text"
          value={displayName}
          onUpdate={setDisplayName}
          required
        />
        <RightAligned>
          <Button icon={Save} disabled={displayName === "" || displayName === user.displayName}>
            Save
          </Button>
        </RightAligned>
      </form>
      <form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
        <IconUpload
          label="Profile photo"
          helpText="The photo that identifies you on this application."
          file={image}
          onUpdate={setImage}
        />
        <RightAligned>
          <Button icon={Save} disabled={!image}>
            Save
          </Button>
        </RightAligned>
      </form>
    </section>
  );
}

function LinkAccountSection() {
  const { providerData } = useUser();
  const breakpoint = useBreakpoint();

  return (
    <section>
      <h2>Link accounts</h2>
      <p>
        Your account is currently linked with the following services, and you can use these to sign
        in to your account. You must link your account with at least one service.
      </p>
      <div className="flex flex-col mb-6 bg-card rounded overflow-hidden border border-card divide-y divide-card">
        {providerData.map(data => (
          <div className="flex flex-row p-3 pl-4.5 gap-x-4.5 items-center" key={data.providerId}>
            {data.providerId === "github.com" && <GitHubLogo size={36} />}
            {data.providerId === "google.com" && <GoogleLogo size={36} />}
            <div className="min-w-0 flex-grow">
              <div className="font-medium truncate">{data.displayName ?? "No username"}</div>
              <div className="text-xs text-muted truncate">{data.email ?? "No email"}</div>
            </div>
            {providerData.length > 1 && (
              <Button variant="danger" icon={Trash}>
                {["xs", "md"].includes(breakpoint) ? null : "Unlink"}
              </Button>
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <span className="col-span-2 font-semibold">Link new account</span>
        <Button
          variant="tertiary"
          disabled={!!providerData.find(data => data.providerId === "github.com")}
        >
          GitHub
        </Button>
        <Button
          variant="tertiary"
          disabled={!!providerData.find(data => data.providerId === "google.com")}
        >
          Google
        </Button>
      </div>
    </section>
  );
}

function ExportDataSection() {
  return (
    <section>
      <h2>Export all data</h2>
      <p>You can request all of your data to be exported to a JSON file.</p>
      <RightAligned>
        <Button icon={HardDrive}>Request data</Button>
      </RightAligned>
    </section>
  );
}

function DeleteAccountSection() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <section>
      <h2>Delete account</h2>
      <p>
        This is an <strong>irreversible</strong> action. All of your data will be completely erased
        and there is no way to recover it. Proceed with caution.
      </p>
      <p>
        Since this is a sensitive action, you will be asked to re-authenticate with{" "}
        <strong>
          {/* user.providerData[0].providerId === "github.com" ? "GitHub" : "Google" */}
          unknown
        </strong>
        . Continue by clicking the button below.
      </p>
      <RightAligned>
        <Button variant="danger" icon={AlertTriangle}>
          Continue
        </Button>
      </RightAligned>
      <Modal isVisible={showDeleteModal} onOutsideClick={() => setShowDeleteModal(false)}>
        <div className="p-6 max-w-lg">
          <h2>You are attempting a dangerous action.</h2>
          <p>
            Deleting an account is <strong>irreversible</strong>, and we cannot do anything to
            recover your data. It will be lost permanently. Please think twice before proceeding.
          </p>
          <RightAligned className="gap-3">
            <Button variant="tertiary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger">Delete</Button>
          </RightAligned>
        </div>
      </Modal>
    </section>
  );
}

export default function AppAccountPage() {
  const user = useUser();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
      <div>
        <ProfileSection />
        <hr />
        <section>
          <h2>User ID</h2>
          <p>Your user ID is</p>
          <CopiableCode content={user.uid} className="mb-6" />
          <p>
            Please use this ID to identify yourself if you need to contact us for support for issues
            related to your profile.
          </p>
        </section>
        <hr className="md:hidden" />
      </div>
      <div>
        <LinkAccountSection />
        <hr />
        <ExportDataSection />
        <hr />
        <DeleteAccountSection />
      </div>
    </div>
  );
}
