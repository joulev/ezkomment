import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import AuthContext from "@client/context/auth";
import firebaseApp from "@client/lib/firebase/app";

import { AppAuth } from "@client/types/auth.type";

import { endProgress, startProgress } from "./nprogress";

export function useAuthInit(): AppAuth {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const auth = getAuth(firebaseApp);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
            if (process.env.NODE_ENV === "development") console.log(user);
            if (!user && router.pathname.startsWith("/app")) router.push("/auth");
            else if (user && router.pathname.startsWith("/auth")) router.push("/app/dashboard");
            setLoading(false);
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (loading) startProgress();
        else endProgress();
    }, [loading]);

    return { user, setUser, loading, setLoading };
}

export default function useAuth() {
    return useContext(AuthContext);
}