import clsx from "clsx";
import { User } from "firebase/auth";
import { FC, MouseEventHandler, ReactNode, useState } from "react";

import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import useAuth from "@client/hooks/auth";
import useBreakpoint from "@client/hooks/breakpoint";
import { linkGitHub, linkGoogle, unlinkGitHub, unlinkGoogle } from "@client/lib/firebase/auth";

import A from "@client/components/anchor";
import Banner from "@client/components/banner";
import Button from "@client/components/buttons";
import { InputDetachedLabel } from "@client/components/forms/input";
import Modal from "@client/components/modal";
import RightAligned from "@client/components/utils/rightAligned";
import AppLayout from "@client/layouts/app";

import { NextPageWithLayout } from "@client/types/utils.type";

const LinkAccountSection: FC = () => {
  const auth = useAuth();
  const { providerData } = auth.user as User;
  const breakpoint = useBreakpoint();
  const [msg, setMsg] = useState<{ type: "success" | "error"; message: ReactNode } | null>(null);

  function handleErrorWhenLinking(err: NodeJS.ErrnoException) {
    setMsg({
      type: "error",
      message:
        err.code === "auth/email-already-in-use" ? (
          "The account's primary email address is already used in another account, hence linking is not allowed."
        ) : (
          <>
            An unknown error occurred. Please{" "}
            <A href="mailto:joulev.vvd@yahoo.com">report it to us</A> with the following error code:{" "}
            <code>{err.code}</code> and try again later.
          </>
        ),
    });
  }

  function handleErrorWhenUnlinking(err: NodeJS.ErrnoException) {
    setMsg({
      type: "error",
      message: (
        <>
          An unknown error occurred. Please{" "}
          <A href="mailto:joulev.vvd@yahoo.com">report it to us</A> with the following error code:{" "}
          <code>{err.code}</code> and try again later.
        </>
      ),
    });
  }

  const handleLinkGitHub: MouseEventHandler<HTMLElement> = async event => {
    event.preventDefault();
    try {
      await linkGitHub(auth);
      setMsg({ type: "success", message: "Successfully linked GitHub account." });
    } catch (err: any) {
      handleErrorWhenLinking(err);
    }
  };

  const handleLinkGoogle: MouseEventHandler<HTMLElement> = async event => {
    event.preventDefault();
    try {
      await linkGoogle(auth);
      setMsg({ type: "success", message: "Successfully linked Google account." });
    } catch (err: any) {
      handleErrorWhenLinking(err);
    }
  };

  const handleUnlinkGitHub: MouseEventHandler<HTMLElement> = async event => {
    event.preventDefault();
    try {
      await unlinkGitHub(auth);
      setMsg({ type: "success", message: "Successfully unlinked GitHub account." });
    } catch (err: any) {
      handleErrorWhenUnlinking(err);
    }
  };

  const handleUnlinkGoogle: MouseEventHandler<HTMLElement> = async event => {
    event.preventDefault();
    try {
      await unlinkGoogle(auth);
      setMsg({ type: "success", message: "Successfully unlinked Google account." });
    } catch (err: any) {
      handleErrorWhenUnlinking(err);
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
      {providerData.length === 1 && providerData[0].providerId === "password" ? (
        <p>
          Your account is currently not linked with any of the following services. If you want to,
          you can link them below.
        </p>
      ) : (
        <>
          <p>
            Your account is currently linked with the following services, and you can use these to
            sign in to your account instead of using one-time links sent to your email address.
          </p>
          <div
            className={clsx(
              "flex flex-col mb-6 bg-card rounded overflow-hidden",
              "border border-card",
              "divide-y divide-card"
            )}
          >
            {providerData
              .filter(data => data.providerId !== "password")
              .map(data => (
                <div className="flex flex-row p-3 gap-x-6 items-center" key={data.providerId}>
                  {data.providerId === "github.com" ? (
                    <GitHubIcon fontSize="large" />
                  ) : (
                    <GoogleIcon fontSize="large" />
                  )}
                  <div className="min-w-0 flex-grow">
                    <div className="text-sm font-medium truncate">
                      {data.displayName ?? "no username"}
                    </div>
                    <div className="text-xs text-muted truncate">{data.email ?? "no email"}</div>
                  </div>
                  <Button
                    variant="danger"
                    icon={DeleteOutlinedIcon}
                    onClick={
                      data.providerId === "github.com" ? handleUnlinkGitHub : handleUnlinkGoogle
                    }
                  >
                    {["xs", "md"].includes(breakpoint) ? null : "Unlink"}
                  </Button>
                </div>
              ))}
          </div>
        </>
      )}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <span className="col-span-2 font-semibold">Link new account</span>
        <Button
          variant="tertiary"
          onClick={handleLinkGitHub}
          disabled={!!providerData.find(data => data.providerId === "github.com")}
        >
          GitHub
        </Button>
        <Button
          variant="tertiary"
          onClick={handleLinkGoogle}
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
        <section>
          <h2>Profile</h2>
          <p>
            An up-to-date information here will help others identify you in comments, as well as
            help us help you with technical details and issues.
          </p>
          <form className="flex flex-col gap-6">
            <InputDetachedLabel
              label="Display name"
              icon={PersonOutlinedIcon}
              type="text"
              value="John Doe"
              helpText="Your name is displayed in your replies to comments."
              onUpdate={() => {}}
              required
            />
            <InputDetachedLabel
              label="Email address"
              icon={EmailOutlinedIcon}
              type="email"
              value="john.doe@example.com"
              helpText="Your email address is used for logging in and recovering your account."
              onUpdate={() => {}}
              required
            />
            <RightAligned>
              <Button icon={SaveOutlinedIcon}>Save</Button>
            </RightAligned>
          </form>
        </section>
        <hr />
        <LinkAccountSection />
        <hr className="md:hidden" />
      </div>
      <div>
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
