import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";

export const loadingStart = new Event("loadingStart");
export const loadingEnd = new Event("loadingEnd");

export default function useNProgress() {
    const router = useRouter();

    const handleRouterStartChange = () => {
        if (NProgress.isStarted()) NProgress.inc();
        else NProgress.start();
    };
    const handleRouterEndChange = () => NProgress.done();

    useEffect(() => {
        router.events.on("routeChangeStart", handleRouterStartChange);
        router.events.on("routeChangeComplete", handleRouterEndChange);
        router.events.on("routeChangeError", handleRouterEndChange);
        return () => {
            router.events.off("routeChangeStart", handleRouterStartChange);
            router.events.off("routeChangeComplete", handleRouterEndChange);
            router.events.off("routeChangeError", handleRouterEndChange);
        };
    }, [router]);

    useEffect(() => {
        window.addEventListener("loadingStart", handleRouterStartChange);
        window.addEventListener("loadingEnd", handleRouterEndChange);
        return () => {
            window.removeEventListener("loadingStart", handleRouterStartChange);
            window.removeEventListener("loadingEnd", handleRouterEndChange);
        };
    }, []);
}
