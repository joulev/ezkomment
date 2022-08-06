import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    unlink as firebaseUnlink,
    getAdditionalUserInfo,
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

export async function initialiseUser(uid: string) {
    const res = await internalFetcher({ url: `/api/users/${uid}/initialize`, method: "PUT" });
    if (process.env.NODE_ENV === "development")
        console.log("Requested email verification successfully. Response = ", res);
}

export async function signIn({ setLoading }: AppAuth, provider: Provider) {
    setLoading(true);
    const result = await signInWithPopup(auth, provider);
    const additionalInfo = getAdditionalUserInfo(result);
    // This shouldn't happen...
    if (!additionalInfo) throw E.DID_YOU_JUST_HACK_THE_SYSTEM;
    // TODO: Add await when notifications are involved
    if (additionalInfo.isNewUser) initialiseUser(result.user.uid);
    setLoading(false);
}

export async function signOut({ setLoading }: AppAuth) {
    setLoading(true);
    await firebaseSignOut(auth);
    setLoading(false);
}

export async function link(appAuth: AppAuth, provider: Provider) {
    appAuth.setLoading(true);
    if (!auth.currentUser) throw E.NOT_AUTHENTICATED;
    await linkWithPopup(auth.currentUser, provider);
    await appAuth.mutate();
    appAuth.setLoading(false);
}

export async function unlink(appAuth: AppAuth, provider: Provider) {
    appAuth.setLoading(true);
    if (!auth.currentUser) throw E.NOT_AUTHENTICATED;
    await firebaseUnlink(auth.currentUser, provider.providerId);
    await appAuth.mutate();
    appAuth.setLoading(false);
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
