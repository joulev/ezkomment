import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import AuthContext from "~/client/context/auth";
import firebaseApp from "~/client/lib/firebase/app";
import { refreshUser } from "~/client/lib/firebase/auth";

import { AppAuth } from "~/types/client/auth.type";
import { ClientUser } from "~/types/server";

import { endProgress, startProgress } from "./nprogress";

export function useAuthInit(): AppAuth {
    const [user, setUser] = useState<ClientUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const auth = getAuth(firebaseApp);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
            if (firebaseUser) {
                await refreshUser({ user, setUser, loading, setLoading });
                if (router.pathname.startsWith("/auth")) router.push("/app/dashboard");
            } else {
                setUser(null);
                if (router.pathname.startsWith("/app")) router.push("/auth");
            }
            setLoading(false);
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (process.env.NODE_ENV === "development") console.log(user);
    }, [user]);

    useEffect(() => {
        if (loading) startProgress();
        else endProgress();
    }, [loading]);

    return { user, setUser, loading, setLoading };
}

export default function useAuth() {
    return useContext(AuthContext);
}
