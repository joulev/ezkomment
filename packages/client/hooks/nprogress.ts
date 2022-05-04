import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";

export default function useNProgress() {
    const router = useRouter();
    const handleRouterStartChange = () => NProgress.start();
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
}
