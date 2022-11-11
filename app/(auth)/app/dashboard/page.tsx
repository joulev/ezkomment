import { redirect } from "next/navigation";
import { getUser } from "~/server/rsc/user";

export default async function AppDashboardPage() {
  const user = await getUser();
  if (!user) redirect("/auth");
  return <div>Hello world</div>;
}
