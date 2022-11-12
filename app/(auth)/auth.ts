import "client-only";
import { initializeApp } from "firebase/app";
import {
    getAdditionalUserInfo,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    inMemoryPersistence,
    setPersistence,
    signInWithPopup,
    signOut as _signOut,
} from "firebase/auth";
import { DID_YOU_JUST_HACK_THE_SYSTEM } from "./errors";
import { internalPost } from "./internal-fetch";

const firebaseApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});
const auth = getAuth(firebaseApp);
export const githubProvider = new GithubAuthProvider();
export const googleProvider = new GoogleAuthProvider();
export type Provider = GithubAuthProvider | GoogleAuthProvider;

export async function signIn(refresh: () => void, provider: Provider) {
    await setPersistence(auth, inMemoryPersistence);
    const credentials = await signInWithPopup(auth, provider);
    const idToken = await credentials.user.getIdToken();
    const additionalInfo = getAdditionalUserInfo(credentials);
    if (!additionalInfo) throw DID_YOU_JUST_HACK_THE_SYSTEM;
    await internalPost("/api/auth/sign-in", { idToken });
    if (additionalInfo.isNewUser) await internalPost("/api/user", {});
    await _signOut(auth);
    refresh();
}

export async function signOut(refresh: () => void) {
    await internalPost("/api/auth/sign-out", {});
    refresh();
}

export async function reauthenticate(provider: Provider) {
    await setPersistence(auth, inMemoryPersistence);
    const { user } = await signInWithPopup(auth, provider);
    await _signOut(auth);
    return user.uid;
}
