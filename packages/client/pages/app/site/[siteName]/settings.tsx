import { GetServerSideProps, NextPage } from "next";
import { FC } from "react";

import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import WebOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";
import CopiableCode from "@client/components/copiableCode";
import { InputDetachedLabel } from "@client/components/forms/input";
import AppLayout from "@client/layouts/app";

import site from "@client/sample/site.json";

type Site = typeof site;
type Props = { site: Site };

const RightAligned: FC = ({ children }) => (
  <div className="flex flex-row justify-end">{children}</div>
);

const SiteSettings: NextPage<Props> = ({ site }) => (
  <AppLayout title={`${site.name} settings`} type="site" activeTab="settings" siteName={site.name}>
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
          <Button variant="danger" icon={DangerousOutlinedIcon}>
            Delete this site
          </Button>
        </RightAligned>
      </div>
    </div>
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async () => ({ props: { site } });

export default SiteSettings;
