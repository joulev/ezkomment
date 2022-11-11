"use client";

import { useRouter } from "next/navigation";
import { signOut } from "~/app/(auth)/auth";
import { ClientUser } from "~/types/server";

export default function AppDashboardPageClient({ user }: { user: ClientUser }) {
  const router = useRouter();
  return (
    <div>
      <div>Welcome {user.email}</div>
      <button onClick={() => signOut(router.refresh)}>Sign out</button>
    </div>
  );
}
