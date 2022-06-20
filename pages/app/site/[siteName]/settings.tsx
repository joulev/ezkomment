import { FC, useState } from "react";

import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import WebOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { useSite } from "~/client/hooks/site";

import A from "~/client/components/anchor";
import sitePages from "~/client/components/app/handleSite";
import Button from "~/client/components/buttons";
import CopiableCode from "~/client/components/copiableCode";
import { InputDetachedLabel } from "~/client/components/forms/input";
import Modal from "~/client/components/modal";
import RightAligned from "~/client/components/utils/rightAligned";

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

const Content: FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { site } = useSite();
  if (!site) return <Loading />;
  return (
    <div className="grid md:grid-cols-2 gap-x-12">
      <div>
        <h2>Basic information</h2>
        <form className="flex flex-col gap-6">
          <InputDetachedLabel
            label="Site name"
            icon={LabelOutlinedIcon}
            type="text"
            value={site.name}
            helpText="The site name helps identify your site in the dashboard and the URL."
            onUpdate={() => {}}
            required
          />
          <InputDetachedLabel
            label="Site domain"
            icon={WebOutlinedIcon}
            type="text"
            value={site.domain}
            helpText={
              <>
                The domain is where you want to host the comments. It can be any domain or
                subdomain. Other websites will not be allowed to host the comments. Use an asterisk
                (<code>*</code>) to allow all domains.
              </>
            }
            onUpdate={() => {}}
            required
          />
          <RightAligned>
            <Button icon={SaveOutlinedIcon}>Save</Button>
          </RightAligned>
        </form>
        <hr />
        <h2>Site ID</h2>
        <p>Your site ID is</p>
        <CopiableCode content={site.id} className="mb-6" />
        <p>
          You can use this to implement your own comment frontend based on the REST API provided by
          ezkomment. <A href="https://google.com">See more in the documentation</A>.
        </p>
        <hr className="md:hidden" />
      </div>
      <div>
        <h2>Export all data</h2>
        <p>
          You can request all data related to this site to be exported. You can only perform this
          action once a day.
        </p>
        <RightAligned>
          <Button icon={DnsOutlinedIcon}>Request data</Button>
        </RightAligned>
        <hr />
        <h2>Delete site</h2>
        <p>
          This is an <strong>irreversible</strong> action. All site data, including all comments and
          pages, will be completely erased and there is no way to recover it. All embed and API
          endpoints for the site will also stop working. Proceed with caution.
        </p>
        <RightAligned>
          <Button
            variant="danger"
            icon={DangerousOutlinedIcon}
            onClick={() => setShowDeleteModal(true)}
          >
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
            <RightAligned className="gap-3">
              <Button variant="tertiary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger">Delete</Button>
            </RightAligned>
          </div>
        </Modal>
      </div>
    </div>
  );
};

const {
  Page: SiteOverview,
  getStaticPaths,
  getStaticProps,
} = sitePages({
  title: siteName => `Settings | ${siteName}`,
  activeTab: "settings",
  Loading,
  Content,
});

export { SiteOverview as default, getStaticPaths, getStaticProps };
