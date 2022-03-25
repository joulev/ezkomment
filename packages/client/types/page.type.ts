export type PageType = "overview" | "site" | "page" | "others";
export type NavbarItems = {
    overview: "dashboard" | "new" | "account";
    site: "all" | "customise" | "settings";
    page: "all" | "pending" | "settings";
};
export type CurrentPage =
    | {
          type: "overview";
          activeTab: NavbarItems["overview"] | undefined;
          siteId?: never;
          pageId?: never;
      }
    | {
          type: "site";
          activeTab: NavbarItems["site"] | undefined;
          siteId: string;
          pageId?: never;
      }
    | {
          type: "page";
          activeTab: NavbarItems["page"] | undefined;
          siteId: string;
          pageId: string;
      }
    | {
          type: "others";
          activeTab?: never;
          siteId?: never;
          pageId?: never;
      };
