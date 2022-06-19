import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import AuthContext from "~/client/context/auth";
import { UNKNOWN_ERROR } from "~/client/lib/errors";
import { internalFetcher as fetcher } from "~/client/lib/fetcher";
import firebaseApp from "~/client/lib/firebase/app";

import { AppAuth, User } from "~/types/client/auth.type";
import { Site } from "~/types/server";
import { ApiResponseBody } from "~/types/server/nextApi.type";

import { endProgress, startProgress } from "./nprogress";

export function useAuthInit(): AppAuth {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const auth = getAuth(firebaseApp);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            if (user) {
                const { success, body } = await fetcher({ url: `/api/users/${user.uid}/sites` });
                if (!success) throw UNKNOWN_ERROR;
                const sites = (body as ApiResponseBody).data as Site[];
                setUser({ ...user, sites });
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
