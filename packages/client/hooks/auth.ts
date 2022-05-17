import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import AuthContext from "@client/context/auth";
import firebaseApp from "@client/lib/firebase/app";

import { AppAuth, AppUser } from "@client/types/auth.type";

export function useAuthInit(): AppAuth {
    const [user, setUser] = useState<AppUser>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const auth = getAuth(firebaseApp);

    useEffect(() => {
        console.log("user changed:", user);
    }, [user]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user ? { uid: user.uid, email: user.email } : null);
            if (!user && router.pathname.startsWith("/app")) router.push("/auth/signin");
            else if (user && router.pathname.startsWith("/auth")) router.push("/app/dashboard");
            setLoading(false);
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { user, setUser, loading, setLoading };
}

export default function useAuth() {
    return useContext(AuthContext);
}
