"use client";

import useAuth from "~/app/hooks/auth";

export default function AppDashboardPage() {
  const auth = useAuth();

  return (
    <div>
      <h1>App</h1>
      {auth.user && <p>{auth.user.email}</p>}
      {!auth.user && <p>Not logged in</p>}
    </div>
  );
}
