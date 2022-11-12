"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { githubProvider, googleProvider, signIn, Provider } from "~/app/(auth)/auth";
import { useSetToast } from "~/app/(auth)/toast";
import { useLoadingState } from "~/app/loading-state";
import AuthError from "~/app/components/auth-error";
import Button from "~/app/components/buttons.client";
import GitHubLogo from "~/app/(auth)/components/github-logo";
import GoogleLogo from "~/app/(auth)/components/google-logo";

export default function AuthPageClient() {
  const setToast = useSetToast();
  const router = useRouter();
  const { loading, setLoading } = useLoadingState();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const handler = (provider: Provider) => async (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await signIn(router.refresh, provider);
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Button icon={() => <GitHubLogo />} onClick={handler(githubProvider)} disabled={loading}>
        Continue with GitHub
      </Button>
      <Button icon={() => <GoogleLogo />} onClick={handler(googleProvider)} disabled={loading}>
        Continue with Google
      </Button>
    </div>
  );
}
