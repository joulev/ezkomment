import {
    GithubAuthProvider,
    signOut as firebaseSignOut,
    getAuth,
    getRedirectResult,
    onAuthStateChanged,
    signInWithRedirect,
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";

import AuthContext from "@client/context/auth";
import firebaseApp from "@client/lib/firebase";

import { AppAuth, AppUser } from "@client/types/auth.type";

const githubProvider = new GithubAuthProvider();

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

export async function signIn(appAuth: AppAuth) {
    const { setUser, setLoading } = appAuth;
    setLoading(true);
    const auth = getAuth(firebaseApp);
    await signInWithRedirect(auth, githubProvider);
    const credential = await getRedirectResult(auth);
    setUser(credential ? { uid: credential.user.uid, email: credential.user.email } : null);
    setLoading(false);
}

export async function signOut(appAuth: AppAuth) {
    const { setUser, setLoading } = appAuth;
    setLoading(true);
    const auth = getAuth(firebaseApp);
    await firebaseSignOut(auth);
    setUser(null);
    setLoading(false);
}
