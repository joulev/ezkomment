import { User } from "firebase/auth";
import { FC, FormEventHandler, MouseEvent, ReactNode, useState } from "react";

import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import useAuth from "@client/hooks/auth";
import useBreakpoint from "@client/hooks/breakpoint";
import {
  githubProvider,
  googleProvider,
  link,
  unlink,
  updateDisplayName,
} from "@client/lib/firebase/auth";

import Banner from "@client/components/banner";
import Button from "@client/components/buttons";
import CopiableCode from "@client/components/copiableCode";
import { InputDetachedLabel } from "@client/components/forms/input";
import Modal from "@client/components/modal";
import UnknownError from "@client/components/unknownError";
import RightAligned from "@client/components/utils/rightAligned";
import AppLayout from "@client/layouts/app";

import { Provider } from "@client/types/auth.type";
import { NextPageWithLayout } from "@client/types/utils.type";

type Msg = { type: "success" | "error"; message: ReactNode } | null;

function handleError(setMsg: (msg: Msg) => void, err: NodeJS.ErrnoException) {
  switch (err.code) {
    case "auth/account-exists-with-different-credential":
      setMsg({
        type: "error",
        message:
          "An account already exists with the same email address but different sign-in credentials, hence linking is not allowed.",
      });
      break;
    case "auth/email-already-in-use":
      setMsg({
        type: "error",
        message:
          "The account's primary email address is already used in another account, hence linking is not allowed.",
      });
      break;
    case "ezkomment/client":
      setMsg({ type: "error", message: err.message });
      break;
    default:
      setMsg({ type: "error", message: <UnknownError err={err} /> });
  }
}

const ProfileSection: FC = () => {
  const auth = useAuth();
  const [displayName, setDisplayName] = useState(auth.user?.displayName ?? "");
  const [msg, setMsg] = useState<Msg>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    try {
      await updateDisplayName(auth, displayName);
      setMsg({ type: "success", message: "Display name updated successfully." });
    } catch (err: any) {
      handleError(setMsg, err);
    }
  };

  return (
    <section>
      <h2>Profile</h2>
      <p>
        An up-to-date information here will help others identify you in comments, as well as help us
        help you with technical details and issues.
      </p>
      {!auth.user!.displayName && (
        <Banner variant="warning" className="mb-6">
          You currently do not have a display name. In your replies to comments, you will simply be
          identified as <i>Author</i>. It is recommended to have a display name.
        </Banner>
      )}
      {msg && (
        <Banner variant={msg.type === "success" ? "info" : "error"} className="mb-6">
          {msg.message}
        </Banner>
      )}
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <InputDetachedLabel
          label="Display name"
          placeholder="Your name"
          icon={PersonOutlinedIcon}
          type="text"
          value={displayName}
          helpText="Your name is displayed in your replies to comments."
          onUpdate={setDisplayName}
          required
        />
        <RightAligned>
          <Button icon={SaveOutlinedIcon}>Save</Button>
        </RightAligned>
      </form>
    </section>
  );
};

const LinkAccountSection: FC = () => {
  const auth = useAuth();
  const { providerData } = auth.user as User;
  const breakpoint = useBreakpoint();
  const [msg, setMsg] = useState<Msg>(null);

  const handler =
    (func: typeof link, provider: Provider, str: string) => async (event: MouseEvent) => {
      event.preventDefault();
      try {
        await func(auth, provider);
        setMsg({ type: "success", message: `Successfully ${str}.` });
      } catch (err: any) {
        handleError(setMsg, err);
      }
    };

  return (
    <section>
      <h2>Link accounts</h2>
      {msg && (
        <Banner variant={msg.type === "success" ? "info" : "error"} className="mb-6">
          {msg.message}
        </Banner>
      )}
      <p>
        Your account is currently linked with the following services, and you can use these to sign
        in to your account. You must link your account with at least one service.
      </p>
      <div className="flex flex-col mb-6 bg-card rounded overflow-hidden border border-card divide-y divide-card">
        {providerData.map(data => (
          <div className="flex flex-row p-3 gap-x-6 items-center" key={data.providerId}>
            {data.providerId === "github.com" && <GitHubIcon fontSize="large" />}
            {data.providerId === "google.com" && <GoogleIcon fontSize="large" />}
            <div className="min-w-0 flex-grow">
              <div className="font-medium truncate">{data.displayName ?? "no username"}</div>
              <div className="text-xs text-muted truncate">{data.email ?? "no email"}</div>
            </div>
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

const Account: NextPageWithLayout = () => {
  const auth = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return !auth.user ? (
    <div>Authenticating</div>
  ) : (
    <div className="grid md:grid-cols-2 gap-x-12">
      <div>
        <ProfileSection />
        <hr />
        <h2>User ID</h2>
        <p>Your user ID is</p>
        <CopiableCode content={auth.user.uid} className="mb-6" />
        <p>
          Please use this ID to identify yourself if you need to contact us for support for issues
          related to your profile.
        </p>
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
            <Button icon={DnsOutlinedIcon}>Request data</Button>
          </RightAligned>
        </section>
        <hr />
        <section>
          <h2>Delete account</h2>
          <p>
            This is an <strong>irreversible</strong> action. All of your data will be completely
            erased and there is no way to recover it. Proceed with caution.
          </p>
          <RightAligned>
            <Button
              variant="danger"
              icon={DangerousOutlinedIcon}
              onClick={() => setShowDeleteModal(true)}
            >
              Delete my account
            </Button>
          </RightAligned>
          <Modal isVisible={showDeleteModal} onOutsideClick={() => setShowDeleteModal(false)}>
            <div className="p-6 max-w-lg">
              <h2>You are attempting a dangerous action.</h2>
              <p>
                Deleting an account is <strong>irreversible</strong>, and we cannot do anything to
                recover your data. It will be lost permanently. Please think twice before
                proceeding.
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
      </div>
    </div>
  );
};

Account.getLayout = page => (
  <AppLayout title="Account settings" type="overview" activeTab="account">
    {page}
  </AppLayout>
);

export default Account;
