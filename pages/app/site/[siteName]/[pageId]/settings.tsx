import { FC, useState } from "react";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import WebOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { usePage } from "~/client/hooks/page";

import A from "~/client/components/anchor";
import pagePages from "~/client/components/app/handlePage";
import Banner from "~/client/components/banner";
import Button from "~/client/components/buttons";
import CopiableCode from "~/client/components/copiableCode";
import { InputDetachedLabel } from "~/client/components/forms/input";
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

const Content: FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { page } = usePage();

  if (!page) return <Loading />;

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-3">{page.name}</h1>
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
      <h2>Page information</h2>
      <p>Information here identifies the page in the site dashboard.</p>
      <form className="flex flex-col gap-6">
        <InputDetachedLabel
          label="Page title"
          icon={LabelOutlinedIcon}
          type="text"
          value={page.name}
          onUpdate={() => {}}
          required
        />
        <InputDetachedLabel
          label="Page URL"
          icon={WebOutlinedIcon}
          type="text"
          value={page.url}
          onUpdate={() => {}}
          required
        />
        <RightAligned>
          <Button icon={SaveOutlinedIcon}>Save</Button>
        </RightAligned>
      </form>
      <hr />
      <h2>Page ID</h2>
      <p>Your page ID is</p>
      <CopiableCode content={page.id} className="mb-6" />
      <p>
        This ID can be used to interact with the ezkomment REST API.{" "}
        <A href="https://google.com">See more information in the docs</A>.
      </p>
      <hr />
      <h2>Automatic approval</h2>
      <p>
        If you enable auto-approval, all comments posted to this page will automatically be approved
        and visible to everyone.
      </p>
      <p>
        You are currently having auto-approval{" "}
        <strong>{page.autoApprove ? "enabled" : "disabled"}</strong>.
      </p>
      {page.autoApprove && (
        <Banner variant="warning" className="mb-6">
          Beware of the possibilities of spam and abuse if you enable this.
        </Banner>
      )}
      <RightAligned>
        <Button icon={page.autoApprove ? ClearOutlinedIcon : CheckOutlinedIcon}>
          {page.autoApprove ? "Disable" : "Enable"} auto-approval
        </Button>
      </RightAligned>
      <hr />
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
          <RightAligned className="gap-3">
            <Button variant="tertiary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger">Delete</Button>
          </RightAligned>
        </div>
      </Modal>
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
