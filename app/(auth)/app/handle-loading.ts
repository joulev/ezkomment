import "client-only";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function useLoadingParams(context: any) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    // TODO
    const loading = searchParams!.get("loading") !== null;
    useEffect(() => {
        if (!loading) return;
        router.push(pathname || "/app/dashboard");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);
    return loading;
}
