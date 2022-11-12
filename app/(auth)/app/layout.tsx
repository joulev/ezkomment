import { Suspense } from "react";
import { redirect } from "next/navigation";
import Footer from "~/app/(public)/components/footer";
import asyncComponent from "~/app/hack";
import { getUser } from "~/server/rsc/user";
import Loading from "./components/loading";
import AppLayoutClient from "./layout.client";

const _AppLayout = asyncComponent(async ({ children }: React.PropsWithChildren) => {
  const user = await getUser();
  if (!user) redirect("/auth");
  return (
    <AppLayoutClient rscUser={user}>
      {children}
      <Footer />
    </AppLayoutClient>
  );
});

export default function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <Suspense fallback={<Loading />}>
      <_AppLayout>{children}</_AppLayout>
    </Suspense>
  );
}
