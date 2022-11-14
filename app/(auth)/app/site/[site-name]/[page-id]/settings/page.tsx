"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertTriangle, Tag, Globe, Save } from "lucide-react";
import { PAGE } from "~/misc/validate";
import { internalDelete, internalPut } from "~/app/(auth)/internal-fetch";
import { useAuth } from "~/app/(auth)/app/user";
import { useSite } from "~/app/(auth)/app/site/[site-name]/site";
import { usePage } from "../page-context";
import { useLoadingState } from "~/app/loading-state";
import { useSetToast } from "~/app/(auth)/toast";
import { UNABLE_TO_DELETE_PAGE, UNABLE_TO_UPDATE_PAGE } from "~/app/(auth)/errors";
import A from "~/app/components/anchor.client";
import AuthError from "~/app/components/auth-error";
import Button from "~/app/components/buttons.client";
import CopiableCode from "~/app/components/copiable-code.client";
import Input from "~/app/components/forms/input";
import InputDetachedLabel from "~/app/components/forms/input-detached-label";
import Modal from "~/app/components/modal.client";
import RightAligned from "~/app/components/utils/right-aligned";

function UpdateSiteInfo() {
  const { setLoading } = useLoadingState();
  const { site, mutate: mutateSite } = useSite();
  const { page, mutate: mutatePage } = usePage();
  const setToast = useSetToast();
  const [title, setTitle] = useState(page!.title);
  const [url, setUrl] = useState(page!.url);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (
      !PAGE.titleIsValid(title) ||
      !PAGE.urlMatchDomain(url, site.domain) ||
      (title === page.title && url === page.url)
    )
      return;
    setLoading(true);
    try {
      const { success } = await internalPut(`/api/pages/${page.id}`, { title, url });
      if (!success) throw UNABLE_TO_UPDATE_PAGE;
      await mutateSite();
      await mutatePage();
      setToast({ type: "success", message: "Page updated successfully" });
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
    }
    setLoading(false);
  };

  return (
    <section>
      <h2>Page information</h2>
      <p>Information here identifies the page in the site dashboard.</p>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <InputDetachedLabel
          label="Page title"
          icon={Tag}
          type="text"
          value={title}
          onUpdate={setTitle}
          required
          isInvalid={!PAGE.titleIsValid(title)}
        />
        <InputDetachedLabel
          label="Page URL"
          icon={Globe}
          type="text"
          value={url}
          onUpdate={setUrl}
          required
          isInvalid={!PAGE.urlMatchDomain(url, site.domain)}
        />
        {url !== "" && !PAGE.urlMatchDomain(url, site.domain) && (
          <p className="text-red-500 text-sm -mt-3">
            Your URL does not match the site domain ({site.domain}).
          </p>
        )}
        <RightAligned>
          <Button
            icon={Save}
            disabled={
              !PAGE.titleIsValid(title) ||
              !PAGE.urlMatchDomain(url, site.domain) ||
              (title === page.title && url === page.url)
            }
          >
            Save
          </Button>
        </RightAligned>
      </form>
    </section>
  );
}

function UpdateAutoApprove() {
  const { setLoading } = useLoadingState();
  const { mutate: mutateSite } = useSite();
  const { page, mutate: mutatePage } = usePage();
  const setToast = useSetToast();

  const updateAutoApprove = async (autoApprove: boolean) => {
    setLoading(true);
    try {
      const { success } = await internalPut(`/api/pages/${page.id}`, { autoApprove });
      if (!success) throw UNABLE_TO_UPDATE_PAGE;
      await mutateSite();
      await mutatePage();
      setToast({ type: "success", message: "Page updated successfully" });
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
    }
    setLoading(false);
  };

  return (
    <section>
      <h2>Automatic approval</h2>
      <p>
        If you enable auto-approval, all comments posted to this page will automatically be approved
        and visible to everyone.
      </p>
      <div className="mb-6 flex flex-row justify-between">
        <div>
          <span className="text-muted">Auto-approval status:</span>
          <strong className="ml-6">{page.autoApprove ? "Enabled" : "Disabled"}</strong>
        </div>
        <button
          onClick={() => updateAutoApprove(!page.autoApprove)}
          className={clsx(
            "inline-block w-14 h-8 rounded-full relative transition",
            page.autoApprove ? "bg-indigo-500" : "bg-neutral-300 dark:bg-neutral-700",
            "after:absolute after:h-6 after:w-6 after:rounded-full after:bg-white after:top-1 after:transition-all",
            page.autoApprove ? "after:left-7" : "after:left-1"
          )}
          // should I add aria labels throughout the whole app? that would probably take a lot of time
          role="switch"
          aria-checked={page.autoApprove}
          aria-label="Switch auto-approval state"
        />
      </div>
    </section>
  );
}

function DeletePage() {
  const router = useRouter();
  const { mutate: mutateAuth } = useAuth();
  const { setLoading } = useLoadingState();
  const { site, mutate: mutateSite } = useSite();
  const { page } = usePage();
  const setToast = useSetToast();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [promptText, setPromptText] = useState("");
  const validPrompt = "delete this page";

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (!promptText || promptText !== validPrompt) return;
    setLoading(true);
    try {
      const { success } = await internalDelete(`/api/pages/${page.id}`);
      if (!success) throw UNABLE_TO_DELETE_PAGE;
      router.push(`/app/site/${site.name}?loading`);
      await mutateAuth();
      await mutateSite();
      setToast({ type: "success", message: "Page deleted successfully" });
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
    }
    setLoading(false);
  };

  return (
    <section>
      <h2>Page deletion</h2>
      <p>
        If you delete this page, all comments posted to this page will be deleted and the comment
        embed site will stop working. The action is <strong>irreversible</strong>, therefore please
        think twice before doing this.
      </p>
      <RightAligned>
        <Button variant="danger" icon={AlertTriangle} onClick={() => setShowDeleteModal(true)}>
          Delete this page
        </Button>
      </RightAligned>
      <Modal isVisible={showDeleteModal} onOutsideClick={() => setShowDeleteModal(false)}>
        <div className="p-6 max-w-lg">
          <h2>You are attempting a dangerous action.</h2>
          <p>
            Deleting a page is <strong>irreversible</strong>, and we cannot do anything to recover
            any data related to the page. Please think twice before proceeding.
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

export default function AppPageSettingsPage() {
  const { page } = usePage();
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-3">{page.title}</h1>
      <div className="flex flex-row gap-3 text-muted">
        <Globe />
        <A
          href={page.url}
          notStyled
          className="hover:text-neutral-900 dark:hover:text-neutral-100 transition whitespace-nowrap text-ellipsis overflow-hidden"
        >
          {page.url}
        </A>
      </div>
      <hr />
      <UpdateSiteInfo />
      <hr />
      <section>
        <h2>Page ID</h2>
        <p>Your page ID is</p>
        <CopiableCode content={page.id} className="mb-6" />
        <p>
          This ID can be used to interact with the ezkomment REST API.{" "}
          <A href="/docs/rest-api/introduction">See more information in the docs</A>.
        </p>
      </section>
      <hr />
      <UpdateAutoApprove />
      <hr />
      <DeletePage />
    </div>
  );
}
