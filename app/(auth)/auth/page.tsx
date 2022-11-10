"use client";

import { useAuth, signIn, signOut, googleProvider } from "~/app/(auth)/auth";

export default function AuthPage() {
  const auth = useAuth();
  if (auth.user) {
    return (
      <div>
        <div>Hi {auth.user.email}!</div>
        <button onClick={() => signOut(auth)}>Sign out</button>
      </div>
    );
  }
  return (
    <div>
      <button
        onClick={() => {
          signIn(auth, googleProvider);
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
