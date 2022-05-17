import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";

import AuthContext from "@client/context/auth";
import firebaseApp from "@client/lib/firebase/app";

import { AppAuth, AppUser } from "@client/types/auth.type";

export function useAuthInit(): AppAuth {
    const [user, setUser] = useState<AppUser>(null);
    useEffect(() => {
        console.log("user changed:", user);
    }, [user]);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(firebaseApp);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user ? { uid: user.uid, email: user.email } : null);
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
