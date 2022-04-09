import { GetServerSideProps, NextPage } from "next";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import WebOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import A from "@client/components/anchor";
import Banner from "@client/components/banner";
import Button from "@client/components/buttons";
import CopiableCode from "@client/components/copiableCode";
import { InputDetachedLabel } from "@client/components/forms/input";
import RightAligned from "@client/components/utils/rightAligned";
import AppLayout from "@client/layouts/app";

import page from "@client/sample/page.json";

type Page = typeof page;
type Props = { page: Page };

const site = { name: "blog-app" };

const PageSettings: NextPage<Props> = ({ page }) => (
  <AppLayout
    title={`Page settings | ${site.name}`}
    type="page"
    activeTab="settings"
    siteName={site.name}
    pageId={page.id}
  >
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-3">{page.name}</h1>
      <div className="flex flex-row gap-3 text-neutral-500">
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
        <Banner variant="warning">
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
        <Button variant="danger" icon={DangerousOutlinedIcon}>
          Delete this site
        </Button>
      </RightAligned>
    </div>
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async () => ({ props: { page } });

export default PageSettings;
