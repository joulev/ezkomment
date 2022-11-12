"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertTriangle, HardDrive, User, Save } from "lucide-react";
import { githubProvider, googleProvider, reauthenticate } from "~/app/(auth)/auth";
import { internalDelete, internalPut, internalPutNotJson } from "~/app/(auth)/internal-fetch";
import { REAUTHENTICATION_FAILED } from "~/app/(auth)/errors";
import { useLoadingState } from "~/app/loading-state";
import { useSetToast } from "~/app/(auth)/toast";
import { useAuth } from "~/app/(auth)/app/user";
import AuthError from "~/app/components/auth-error";
import Banner from "~/app/components/banner";
import Button from "~/app/components/buttons.client";
import IconUpload from "~/app/components/forms/icon-upload.client";
import InputDetachedLabel from "~/app/components/forms/input-detached-label";
import Modal from "~/app/components/modal.client";
import RightAligned from "~/app/components/utils/right-aligned";

function ProfileSection() {
  const { user, mutate } = useAuth();
  const setToast = useSetToast();
  const { setLoading } = useLoadingState();
  const [displayName, setDisplayName] = useState(user.displayName ?? "");
  const [image, setImage] = useState<File | null>(null);

  const handleDisplayNameSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (!displayName) return;
    setLoading(true);
    try {
      await internalPut("/api/user", { displayName });
      mutate({ ...user, displayName });
      setToast({ type: "success", message: "Display name updated successfully." });
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
    }
    setLoading(false);
  };

  const handlePhotoSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (!image) return;
    setLoading(true);
    try {
      const form = new FormData();
      form.append("photo", image);
      await internalPutNotJson("/api/user/photo", form);
      mutate({ ...user, photoURL: URL.createObjectURL(image) });
      setToast({ type: "success", message: "Photo updated successfully." });
      setImage(null);
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
    }
    setLoading(false);
  };

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
      <form className="flex flex-col gap-6 mb-12" onSubmit={handleDisplayNameSubmit}>
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
      <form className="flex flex-col gap-6" onSubmit={handlePhotoSubmit}>
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
  const router = useRouter();
  const { user } = useAuth();
  const { setLoading } = useLoadingState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const setToast = useSetToast();

  const handleReauthenticate = async (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const uid = await reauthenticate(
        user.providerData[0].providerId === "github.com" ? githubProvider : googleProvider
      );
      if (uid !== user.uid) throw REAUTHENTICATION_FAILED;
      setShowDeleteModal(true);
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
    }
    setLoading(false);
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await internalDelete("/api/user");
      router.refresh();
    } catch (err: any) {
      setShowDeleteModal(false);
      setToast({ type: "error", message: <AuthError err={err} /> });
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Delete account</h2>
      <p>
        This is an <strong>irreversible</strong> action. All of your data will be completely erased
        and there is no way to recover it. Proceed with caution.
      </p>
      <p>
        Since this is a sensitive action, you will be asked to re-authenticate with{" "}
        <strong>{user.providerData[0].providerId === "github.com" ? "GitHub" : "Google"}</strong>.
        Continue by clicking the button below.
      </p>
      <RightAligned>
        <Button variant="danger" icon={AlertTriangle} onClick={handleReauthenticate}>
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
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </RightAligned>
        </div>
      </Modal>
    </section>
  );
}

export default function AppAccountPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
      <div>
        <ProfileSection />
        <hr className="md:hidden" />
      </div>
      <div>
        <ExportDataSection />
        <hr />
        <DeleteAccountSection />
      </div>
    </div>
  );
}
