import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";

import AuthContext from "~/client/context/auth";
import { internalSWRGenerator } from "~/client/lib/fetcher";
import firebaseApp from "~/client/lib/firebase/app";

import { AppAuth } from "~/types/client/auth.type";
import { ClientUser } from "~/types/server";

import { endProgress, startProgress } from "./nprogress";

const auth = getAuth(firebaseApp);

export function useAuthInit(): AppAuth {
    const { data: user, mutate } = useSWR(
        auth.currentUser ? `/api/users/${auth.currentUser.uid}` : null,
        internalSWRGenerator<ClientUser | undefined>()
    );
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
            if (firebaseUser) {
                await mutate();
                if (router.pathname.startsWith("/auth")) router.push("/app/dashboard");
            } else {
                await mutate();
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

    return { user, mutate, loading, setLoading };
}

export default function useAuth() {
    return useContext(AuthContext);
}
