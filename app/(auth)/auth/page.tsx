import { redirect } from "next/navigation";
import { getUser } from "~/server/rsc/user";

export default async function AuthPage() {
  const user = await getUser();
  if (user) redirect("/app/dashboard");
  return <div>Hello world</div>;
}
