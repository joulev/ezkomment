import { GetServerSideProps } from "next";
import { useState } from "react";

import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import WebOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import A from "~/components/anchor";
import Button from "~/components/buttons";
import CopiableCode from "~/components/copiableCode";
import { InputDetachedLabel } from "~/components/forms/input";
import Modal from "~/components/modal";
import RightAligned from "~/components/utils/rightAligned";
import AppLayout from "~/layouts/app";

import { NextPageWithLayout } from "~/types/utils.type";

import site from "~/sample/site.json";

type Site = typeof site;
type Props = { site: Site };

const SiteSettings: NextPageWithLayout<Props> = ({ site }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

SiteSettings.getLayout = page => (
  <AppLayout
    title={`Settings | ${site.name}`}
    type="site"
    activeTab="settings"
    siteName={site.name}
  >
    {page}
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async () => ({ props: { site } });

export default SiteSettings;
