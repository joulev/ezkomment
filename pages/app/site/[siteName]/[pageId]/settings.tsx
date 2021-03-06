import clsx from "clsx";
import { useRouter } from "next/router";
import { FC, FormEventHandler, useState } from "react";

import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import WebOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { PAGE } from "~/misc/validate";

import useAuth from "~/client/hooks/auth";
import { usePage } from "~/client/hooks/page";
import { useSite } from "~/client/hooks/site";
import { useSetToast } from "~/client/hooks/toast";
import { UNABLE_TO_DELETE_PAGE, UNABLE_TO_UPDATE_PAGE } from "~/client/lib/errors";
import { internalFetcher } from "~/client/lib/fetcher";

import A from "~/client/components/anchor";
import pagePages from "~/client/components/app/handlePage";
import AuthError from "~/client/components/auth/error";
import Button from "~/client/components/buttons";
import CopiableCode from "~/client/components/copiableCode";
import Input, { InputDetachedLabel } from "~/client/components/forms/input";
import Modal from "~/client/components/modal";
import RightAligned from "~/client/components/utils/rightAligned";

const LoadingSection: FC = () => (
  <section>
    <div className="h-8 w-36 pulse mb-6" />
    <div className="h-4 pulse mb-6" />
    <div className="h-6 w-48 pulse mb-3" />
    <div className="h-9 pulse mb-6" />
    <div className="h-6 w-48 pulse mb-3" />
    <div className="h-9 pulse mb-6" />
    <RightAligned>
      <div className="h-9 w-32 pulse" />
    </RightAligned>
  </section>
);

const Loading: FC = () => (
  <div className="mx-auto max-w-3xl">
    <div className="mb-6 h-9 w-48 pulse" />
    <div className="h-5 pulse" />
    <hr />
    <LoadingSection />
    <hr />
    <LoadingSection />
    <hr />
    <LoadingSection />
    <hr />
    <LoadingSection />
  </div>
);

const UpdateSiteInfo: FC = () => {
  const { setLoading } = useAuth();
  const { site, mutate: mutateSite } = useSite();
  const { page, mutate: mutatePage } = usePage();
  const setToast = useSetToast();
  const [title, setTitle] = useState(page!.title);
  const [url, setUrl] = useState(page!.url);
  if (!site || !page) return <div>Something&apos;s wrong</div>; // never happen

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (
      !PAGE.titleIsValid(title) ||
      !PAGE.urlIsValid(url) ||
      (title === page.title && url === page.url)
    )
      return;
    setLoading(true);
    try {
      const { success } = await internalFetcher({
        url: `/api/pages/${page.id}`,
        method: "PUT",
        options: { body: JSON.stringify({ title, url }) },
      });
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
          icon={LabelOutlinedIcon}
          type="text"
          value={title}
          onUpdate={setTitle}
          required
          isInvalid={!PAGE.titleIsValid(title)}
        />
        <InputDetachedLabel
          label="Page URL"
          icon={WebOutlinedIcon}
          type="text"
          value={url}
          onUpdate={setUrl}
          required
          isInvalid={!PAGE.urlIsValid(url)}
        />
        <RightAligned>
          <Button
            icon={SaveOutlinedIcon}
            disabled={
              !PAGE.titleIsValid(title) ||
              !PAGE.urlIsValid(url) ||
              (title === page.title && url === page.url)
            }
          >
            Save
          </Button>
        </RightAligned>
      </form>
    </section>
  );
};

const UpdateAutoApprove: FC = () => {
  const { setLoading } = useAuth();
  const { site, mutate: mutateSite } = useSite();
  const { page, mutate: mutatePage } = usePage();
  const setToast = useSetToast();
  if (!site || !page) return <div>Something&apos;s wrong</div>; // never happen

  const updateAutoApprove = async (newAutoApprove: boolean) => {
    setLoading(true);
    try {
      const { success } = await internalFetcher({
        url: `/api/pages/${page.id}`,
        method: "PUT",
        options: { body: JSON.stringify({ autoApprove: newAutoApprove }) },
      });
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
};

const DeletePage: FC = () => {
  const router = useRouter();
  const auth = useAuth();
  const { site, mutate: mutateSite } = useSite();
  const { page } = usePage();
  const setToast = useSetToast();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [promptText, setPromptText] = useState("");
  const validPrompt = "delete this page";
  if (!site || !page) return <div>Something&apos;s wrong</div>; // never happen

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (!promptText || promptText !== validPrompt) return;
    auth.setLoading(true);
    try {
      const { success } = await internalFetcher({ url: `/api/pages/${page.id}`, method: "DELETE" });
      if (!success) throw UNABLE_TO_DELETE_PAGE;
      router.replace(`/app/site/${site.name}?loading=1`);
      await auth.mutate();
      await mutateSite();
      setToast({ type: "success", message: "Page deleted successfully" });
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
    }
    auth.setLoading(false);
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
        <Button
          variant="danger"
          icon={DangerousOutlinedIcon}
          onClick={() => setShowDeleteModal(true)}
        >
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
  const { page } = usePage();
  if (!page) return <Loading />;
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-3">{page.title}</h1>
      <div className="flex flex-row gap-3 text-muted">
        <WebOutlinedIcon />
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
};

const PageSettings = pagePages({
  title: siteName => `Page settings | ${siteName}`,
  activeTab: "settings",
  Content,
  Loading,
});

export default PageSettings;
