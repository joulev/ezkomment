import { FC } from "react";

export type PageType = "overview" | "site" | "page" | "others";
export type NavbarItems = {
    overview: "dashboard" | "new" | "account";
    site: "all" | "customise" | "settings";
    page: "all" | "settings";
};
export type CurrentPage =
    | {
          type: "overview";
          activeTab: NavbarItems["overview"] | undefined;
          siteName?: never;
          pageId?: never;
      }
    | {
          type: "site";
          activeTab: NavbarItems["site"] | undefined;
          siteName: string;
          pageId?: never;
      }
    | {
          type: "page";
          activeTab: NavbarItems["page"] | undefined;
          siteName: string;
          pageId: string;
      }
    | {
          type: "others";
          activeTab?: never;
          siteName?: never;
          pageId?: never;
      };

export type SitePagesOptions = {
    title: (siteName: string) => string;
    activeTab: NavbarItems["site"];
    removePadding?: boolean;
    Loading: FC;
    Content: FC<{ siteId: string }>;
};
