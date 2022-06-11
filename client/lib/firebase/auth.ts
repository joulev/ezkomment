import {
    GithubAuthProvider,
    GoogleAuthProvider,
    User,
    deleteUser,
    signOut as firebaseSignOut,
    unlink as firebaseUnlink,
    getAuth,
    linkWithPopup,
    reauthenticateWithPopup,
    signInWithPopup,
} from "firebase/auth";

import { NOT_AUTHENTICATED, UNABLE_TO_UPDATE_NAME } from "~/client/lib/errors";

import { AppAuth, Provider } from "~/types/client/auth.type";

import firebaseApp from "./app";

const auth = getAuth(firebaseApp);
export const githubProvider = new GithubAuthProvider();
export const googleProvider = new GoogleAuthProvider();

async function fetcher<T = any>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    options: RequestInit = {}
) {
    const user = auth.currentUser;
    if (!user) throw NOT_AUTHENTICATED;
    const token = await user.getIdToken();
    const response = await fetch(url, {
        ...options,
        method,
        headers: {
            ...options.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return { success: response.ok, data: (await response.json()).data as T };
}

export async function signIn({ setLoading }: AppAuth, provider: Provider) {
    setLoading(true);
    await signInWithPopup(auth, provider);
    setLoading(false);
}

export async function signOut({ setLoading }: AppAuth) {
    setLoading(true);
    await firebaseSignOut(auth);
    setLoading(false);
}

export async function link({ setLoading }: AppAuth, provider: Provider) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await linkWithPopup(auth.currentUser, provider);
    setLoading(false);
}

export async function unlink({ setLoading }: AppAuth, provider: Provider) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await firebaseUnlink(auth.currentUser, provider.providerId);
    setLoading(false);
}

export async function reauthenticate({ setLoading }: AppAuth, provider: Provider) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await reauthenticateWithPopup(auth.currentUser, provider);
    setLoading(false);
}

export async function updateDisplayName({ setUser, setLoading }: AppAuth, displayName: string) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    const { success } = await fetcher("POST", `/api/users/${auth.currentUser.uid}`, {
        body: JSON.stringify({ displayName }),
    });
    if (!success) throw UNABLE_TO_UPDATE_NAME;
    setUser(user => ({ ...user, displayName } as User));
    setLoading(false);
}

export async function deleteAccount({ setLoading }: AppAuth) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await deleteUser(auth.currentUser);
    setLoading(false);
}
