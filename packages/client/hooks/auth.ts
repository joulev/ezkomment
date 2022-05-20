import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

import firebaseApp from "@client/lib/firebase/app";

import { loadingStart } from "./nprogress";

export function useAuthInit() {
    const router = useRouter();
    const auth = getAuth(firebaseApp);
    useEffect(() => {
        window.dispatchEvent(loadingStart);
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (process.env.NODE_ENV === "development") console.log(user);
            if (!user && router.pathname.startsWith("/app")) router.push("/auth");
            else if (user && router.pathname.startsWith("/auth")) router.push("/app/dashboard");
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
