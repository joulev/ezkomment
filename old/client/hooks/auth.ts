import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";

import AuthContext from "~/old/client/context/auth";
import { internalSWRGenerator } from "~/old/client/lib/fetcher";
import firebaseApp from "~/old/client/lib/firebase/app";
import { endProgress, startProgress } from "~/old/client/lib/nprogress";

import { AppAuth } from "~/old/types/client/auth.type";
import { ClientUser, Notification } from "~/old/types/server";

const auth = getAuth(firebaseApp);

export function useAuthInit(): AppAuth {
    const { data: user, mutate } = useSWR(
        auth.currentUser ? `/api/users/${auth.currentUser.uid}` : null,
        internalSWRGenerator<ClientUser | undefined>()
    );
    const { data: notifications, mutate: mutateNotifications } = useSWR(
        auth.currentUser ? `/api/users/${auth.currentUser.uid}/notifications` : null,
        internalSWRGenerator<Notification[] | undefined>()
    );
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
            await mutate();
            if (firebaseUser && window.location.pathname.startsWith("/auth"))
                router.push("/app/dashboard");
            else if (!firebaseUser && window.location.pathname.startsWith("/app"))
                router.push("/auth");
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

    return { user, mutate, notifications, mutateNotifications, loading, setLoading };
}

export default function useAuth() {
    return useContext(AuthContext);
}