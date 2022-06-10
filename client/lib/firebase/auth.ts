import {
    GithubAuthProvider,
    GoogleAuthProvider,
    deleteUser,
    signOut as firebaseSignOut,
    unlink as firebaseUnlink,
    getAuth,
    linkWithPopup,
    reauthenticateWithPopup,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";

import { NOT_AUTHENTICATED } from "~/client/lib/errors";

import { AppAuth, Provider } from "~/types/auth.type";

import firebaseApp from "./app";

const auth = getAuth(firebaseApp);
export const githubProvider = new GithubAuthProvider();
export const googleProvider = new GoogleAuthProvider();

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

export async function updateDisplayName({ setLoading }: AppAuth, displayName: string) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await updateProfile(auth.currentUser, { displayName });
    setLoading(false);
}

export async function reauthenticate({ setLoading }: AppAuth, provider: Provider) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await reauthenticateWithPopup(auth.currentUser, provider);
    setLoading(false);
}

export async function deleteAccount({ setLoading }: AppAuth) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await deleteUser(auth.currentUser);
    setLoading(false);
}
