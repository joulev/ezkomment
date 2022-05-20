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

import { loadingEnd, loadingStart } from "@client/hooks/nprogress";

import { AppAuth, Provider } from "@client/types/auth.type";

import { NOT_AUTHENTICATED } from "../errors";
import firebaseApp from "./app";

const auth = getAuth(firebaseApp);
export const githubProvider = new GithubAuthProvider();
export const googleProvider = new GoogleAuthProvider();

export async function signIn({ setLoading }: AppAuth, provider: Provider) {
    setLoading(true);
    window.dispatchEvent(loadingStart);
    await signInWithPopup(auth, provider);
    setLoading(false);
    window.dispatchEvent(loadingEnd);
}

export async function signOut({ setLoading }: AppAuth) {
    setLoading(true);
    window.dispatchEvent(loadingStart);
    await firebaseSignOut(auth);
    setLoading(false);
    window.dispatchEvent(loadingEnd);
}

export async function link({ setLoading }: AppAuth, provider: Provider) {
    setLoading(true);
    window.dispatchEvent(loadingStart);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await linkWithPopup(auth.currentUser, provider);
    setLoading(false);
    window.dispatchEvent(loadingEnd);
}

export async function unlink({ setLoading }: AppAuth, provider: Provider) {
    setLoading(true);
    window.dispatchEvent(loadingStart);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await firebaseUnlink(auth.currentUser, provider.providerId);
    setLoading(false);
    window.dispatchEvent(loadingEnd);
}

export async function updateDisplayName({ setLoading }: AppAuth, displayName: string) {
    setLoading(true);
    window.dispatchEvent(loadingStart);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await updateProfile(auth.currentUser, { displayName });
    setLoading(false);
    window.dispatchEvent(loadingEnd);
}

export async function reauthenticate({ setLoading }: AppAuth, provider: Provider) {
    setLoading(true);
    window.dispatchEvent(loadingStart);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await reauthenticateWithPopup(auth.currentUser, provider);
    setLoading(false);
    window.dispatchEvent(loadingEnd);
}

export async function deleteAccount({ setLoading }: AppAuth) {
    setLoading(true);
    window.dispatchEvent(loadingStart);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await deleteUser(auth.currentUser);
    setLoading(false);
    window.dispatchEvent(loadingEnd);
}
