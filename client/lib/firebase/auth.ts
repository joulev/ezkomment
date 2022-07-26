import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    unlink as firebaseUnlink,
    getAuth,
    linkWithPopup,
    reauthenticateWithPopup,
    signInWithPopup,
} from "firebase/auth";
import Router from "next/router";

import * as E from "~/client/lib/errors";
import { internalFetcher } from "~/client/lib/fetcher";

import { AppAuth, Provider } from "~/types/client/auth.type";
import { ClientUser } from "~/types/server";

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
    if (!auth.currentUser) throw E.NOT_AUTHENTICATED;
    await linkWithPopup(auth.currentUser, provider);
    setLoading(false);
}

export async function unlink({ setLoading }: AppAuth, provider: Provider) {
    setLoading(true);
    if (!auth.currentUser) throw E.NOT_AUTHENTICATED;
    await firebaseUnlink(auth.currentUser, provider.providerId);
    setLoading(false);
}

export async function reauthenticate({ setLoading }: AppAuth, provider: Provider) {
    setLoading(true);
    if (!auth.currentUser) throw E.NOT_AUTHENTICATED;
    await reauthenticateWithPopup(auth.currentUser, provider);
    setLoading(false);
}

export async function updateDisplayName(appAuth: AppAuth, displayName: string) {
    appAuth.setLoading(true);
    if (!auth.currentUser) throw E.NOT_AUTHENTICATED;
    const { success } = await internalFetcher({
        method: "PUT",
        url: `/api/users/${auth.currentUser.uid}`,
        options: { body: JSON.stringify({ displayName }) },
    });
    if (!success) throw E.UNABLE_TO_UPDATE_NAME;
    await appAuth.mutate({ ...(appAuth.user as ClientUser), displayName });
    appAuth.setLoading(false);
}

export async function updatePhoto(appAuth: AppAuth, photo: File) {
    appAuth.setLoading(true);
    if (!auth.currentUser) throw E.NOT_AUTHENTICATED;
    const form = new FormData();
    form.append("photo", photo);
    const { success } = await internalFetcher(
        { method: "PUT", url: `/api/users/${auth.currentUser.uid}/photo`, options: { body: form } },
        false
    );
    if (!success) throw E.UNABLE_TO_UPDATE_PHOTO;
    await appAuth.mutate();
    appAuth.setLoading(false);
}

export async function deleteAccount(appAuth: AppAuth) {
    appAuth.setLoading(true);
    if (!auth.currentUser) throw E.NOT_AUTHENTICATED;
    const { success } = await internalFetcher({
        method: "DELETE",
        url: `/api/users/${auth.currentUser.uid}`,
    });
    if (!success) throw E.UNABLE_TO_DELETE_ACCOUNT;
    await firebaseSignOut(auth);
    Router.push("/auth");
    appAuth.setLoading(false);
}
