import { redirect } from "next/navigation";
import Footer from "~/app/(public)/components/footer";
import { getUser } from "~/server/rsc/user";
import AuthLayoutClient from "./layout.client";

export default async function AppLayout({ children }: React.PropsWithChildren) {
  const user = await getUser();
  if (!user) redirect("/auth");
  return (
    <AuthLayoutClient rscUser={user}>
      {children}
      <Footer />
    </AuthLayoutClient>
  );
}
