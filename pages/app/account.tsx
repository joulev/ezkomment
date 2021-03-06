import { FC, FormEventHandler, MouseEvent, useState } from "react";

import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import useAuth from "~/client/hooks/auth";
import useBreakpoint from "~/client/hooks/breakpoint";
import { useSetToast } from "~/client/hooks/toast";
import { NOT_AUTHENTICATED } from "~/client/lib/errors";
import {
  deleteAccount,
  githubProvider,
  googleProvider,
  link,
  reauthenticate,
  unlink,
  updateDisplayName,
  updatePhoto,
} from "~/client/lib/firebase/auth";

import AuthError from "~/client/components/auth/error";
import Banner from "~/client/components/banner";
import Button from "~/client/components/buttons";
import CopiableCode from "~/client/components/copiableCode";
import IconUpload from "~/client/components/forms/iconUpload";
import { InputDetachedLabel } from "~/client/components/forms/input";
import Modal from "~/client/components/modal";
import RightAligned from "~/client/components/utils/rightAligned";
import AppLayout from "~/client/layouts/app";

import { Provider } from "~/types/client/auth.type";
import { NextPageWithLayout } from "~/types/client/utils.type";
import { ClientUser } from "~/types/server";

const ProfileSection: FC = () => {
  const auth = useAuth();
  const [displayName, setDisplayName] = useState(auth.user?.displayName ?? "");
  const [image, setImage] = useState<File | null>(null);
  const setToast = useSetToast();

  const handleDisplayNameSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    try {
      await updateDisplayName(auth, displayName);
      setToast({ type: "success", message: "Display name updated successfully." });
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
      auth.setLoading(false);
    }
  };

  const handlePhotoSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (!image) return;
    try {
      await updatePhoto(auth, image);
      setToast({ type: "success", message: "Photo updated successfully." });
      setImage(null);
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
      auth.setLoading(false);
    }
  };

  return (
    <section>
      <h2>Profile</h2>
      <p>
        This display name helps us identify you. It is recommended to use your actual name as your
        display name (although that is not required).
      </p>
      {!auth.user!.displayName && (
        <Banner variant="warning" className="mb-6">
          You currently do not have a display name. It is recommended to have one.
        </Banner>
      )}
      <form className="flex flex-col gap-6 mb-12" onSubmit={handleDisplayNameSubmit}>
        <InputDetachedLabel
          label="Display name"
          placeholder="Your name"
          icon={PersonOutlinedIcon}
          type="text"
          value={displayName}
          onUpdate={setDisplayName}
          required
        />
        <RightAligned>
          <Button
            icon={SaveOutlinedIcon}
            disabled={displayName === "" || displayName === auth.user?.displayName}
          >
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
          <Button icon={SaveOutlinedIcon} disabled={!image}>
            Save
          </Button>
        </RightAligned>
      </form>
    </section>
  );
};

const LinkAccountSection: FC = () => {
  const auth = useAuth();
  const { providerData } = auth.user as ClientUser;
  const breakpoint = useBreakpoint();
  const setToast = useSetToast();

  const handler =
    (func: typeof link, provider: Provider, str: string) => async (event: MouseEvent) => {
      event.preventDefault();
      try {
        await func(auth, provider);
        setToast({ type: "success", message: `Successfully ${str}.` });
      } catch (err: any) {
        setToast({ type: "error", message: <AuthError err={err} /> });
        auth.setLoading(false);
      }
    };

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
            {data.providerId === "github.com" && <GitHubIcon fontSize="large" />}
            {data.providerId === "google.com" && <GoogleIcon fontSize="large" />}
            <div className="min-w-0 flex-grow">
              <div className="font-medium truncate">{data.displayName ?? "No username"}</div>
              <div className="text-xs text-muted truncate">{data.email ?? "No email"}</div>
            </div>
            {providerData.length > 1 && (
              <Button
                variant="danger"
                icon={DeleteOutlinedIcon}
                onClick={
                  data.providerId === "github.com"
                    ? handler(unlink, githubProvider, "unlinked GitHub account")
                    : handler(unlink, googleProvider, "unlinked Google account")
                }
              >
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
          onClick={handler(link, githubProvider, "linked GitHub account")}
          disabled={!!providerData.find(data => data.providerId === "github.com")}
        >
          GitHub
        </Button>
        <Button
          variant="tertiary"
          onClick={handler(link, googleProvider, "linked Google account")}
          disabled={!!providerData.find(data => data.providerId === "google.com")}
        >
          Google
        </Button>
      </div>
    </section>
  );
};

const DeleteAccountSection: FC = () => {
  const auth = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const setToast = useSetToast();

  const handleReauthenticate = async (event: MouseEvent) => {
    event.preventDefault();
    try {
      if (!auth.user) throw NOT_AUTHENTICATED;
      await reauthenticate(
        auth,
        auth.user.providerData[0].providerId === "github.com" ? githubProvider : googleProvider
      );
      setShowDeleteModal(true);
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
      auth.setLoading(false);
    }
  };

  const handleDelete = async (event: MouseEvent) => {
    event.preventDefault();
    try {
      await deleteAccount(auth);
    } catch (err: any) {
      setShowDeleteModal(false);
      setToast({ type: "error", message: <AuthError err={err} /> });
      auth.setLoading(false);
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
        <strong>
          {auth.user?.providerData[0].providerId === "github.com" ? "GitHub" : "Google"}
        </strong>
        . Continue by clicking the button below.
      </p>
      <RightAligned>
        <Button variant="danger" icon={DangerousOutlinedIcon} onClick={handleReauthenticate}>
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
};

const Account: NextPageWithLayout = () => {
  const user = useAuth().user as ClientUser;
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
        <section>
          <h2>Export all data</h2>
          <p>
            You can request all of your data to be exported to a CSV file. This includes your
            comments, your replies to comments, and your posts, here.
          </p>
          <p>You can only perform this action once a day.</p>
          <RightAligned>
            <Button icon={DnsOutlinedIcon} disabled>
              Request data
            </Button>
          </RightAligned>
        </section>
        <hr />
        <DeleteAccountSection />
      </div>
    </div>
  );
};

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

Account.getLayout = page => (
  <AppLayout
    title="Account settings"
    type="overview"
    activeTab="account"
    loadingScreen={<Loading />}
  >
    {page}
  </AppLayout>
);

export default Account;
