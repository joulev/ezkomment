import { redirect } from "next/navigation";
import { getUser } from "~/server/rsc/user";
import AuthPageClient from "./page.client";

export default async function AuthPage() {
  const user = await getUser();
  if (user) redirect("/app/dashboard");
  return <AuthPageClient />;
}
