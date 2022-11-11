import { redirect } from "next/navigation";
import { getUser } from "~/server/rsc/user";
import AppDashboardPageClient from "./page.client";

export default async function AppDashboardPage() {
  const user = await getUser();
  if (!user) redirect("/auth");
  return <AppDashboardPageClient user={user} />;
}
