import AppSiteOverviewLayoutClient from "./layout.client";

export default async function AppSiteOverviewLayout({ children }: React.PropsWithChildren) {
  return <AppSiteOverviewLayoutClient>{children}</AppSiteOverviewLayoutClient>;
}
