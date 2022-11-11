import AppOverviewLayoutClient from "./layout.client";

export default async function AppOverviewLayout({ children }: React.PropsWithChildren) {
  return <AppOverviewLayoutClient>{children}</AppOverviewLayoutClient>;
}
