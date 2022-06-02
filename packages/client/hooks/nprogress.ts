import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";

export function startProgress() {
    if (NProgress.isStarted()) NProgress.inc();
    else NProgress.start();
}

export function endProgress() {
    NProgress.done();
}

export default function useNProgress() {
    const router = useRouter();
    useEffect(() => {
        router.events.on("routeChangeStart", startProgress);
        router.events.on("routeChangeComplete", endProgress);
        router.events.on("routeChangeError", endProgress);
        return () => {
            router.events.off("routeChangeStart", startProgress);
            router.events.off("routeChangeComplete", endProgress);
            router.events.off("routeChangeError", endProgress);
        };
    }, [router]);
}
