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

import { Provider } from "@client/types/utils.type";

import { NOT_AUTHENTICATED } from "../errors";
import firebaseApp from "./app";

const auth = getAuth(firebaseApp);
export const githubProvider = new GithubAuthProvider();
export const googleProvider = new GoogleAuthProvider();

export async function signIn(provider: Provider) {
    window.dispatchEvent(loadingStart);
    await signInWithPopup(auth, provider);
    window.dispatchEvent(loadingEnd);
}

export async function signOut() {
    window.dispatchEvent(loadingStart);
    await firebaseSignOut(auth);
    window.dispatchEvent(loadingEnd);
}

export async function link(provider: Provider) {
    window.dispatchEvent(loadingStart);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await linkWithPopup(auth.currentUser, provider);
    window.dispatchEvent(loadingEnd);
}

export async function unlink(provider: Provider) {
    window.dispatchEvent(loadingStart);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await firebaseUnlink(auth.currentUser, provider.providerId);
    window.dispatchEvent(loadingEnd);
}

export async function updateDisplayName(displayName: string) {
    window.dispatchEvent(loadingStart);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await updateProfile(auth.currentUser, { displayName });
    window.dispatchEvent(loadingEnd);
}

export async function reauthenticate(provider: Provider) {
    window.dispatchEvent(loadingStart);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await reauthenticateWithPopup(auth.currentUser, provider);
    window.dispatchEvent(loadingEnd);
}

export async function deleteAccount() {
    window.dispatchEvent(loadingStart);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await deleteUser(auth.currentUser);
    window.dispatchEvent(loadingEnd);
}
