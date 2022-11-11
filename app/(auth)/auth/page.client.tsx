"use client";
import { useRouter } from "next/navigation";
import { googleProvider, signIn } from "~/app/(auth)/auth";

export default function AuthPageClient() {
  const router = useRouter();
  return (
    <button onClick={() => signIn(router.refresh, googleProvider)}>Sign in with Google</button>
  );
}
