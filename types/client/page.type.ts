import { FC } from "react";
import { KeyedMutator } from "swr";

import { ClientPage, ClientSite } from "~/types/server";

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
    Content: FC;
};

export type SiteContextProps = {
    site: ClientSite | undefined;
    mutate: KeyedMutator<ClientSite | undefined>;
};

export type PagePagesOptions = {
    title: (siteName: string) => string;
    activeTab: NavbarItems["page"];
    Loading: FC;
    Content: FC;
};

export type PageContextProps = {
    page: ClientPage | undefined;
    mutate: KeyedMutator<ClientPage | undefined>;
};
