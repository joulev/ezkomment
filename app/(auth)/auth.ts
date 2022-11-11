import "client-only";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    inMemoryPersistence,
    setPersistence,
    signInWithPopup,
    signOut as _signOut,
} from "firebase/auth";
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
    await internalPost("/api/auth/sign-in", { idToken });
    await _signOut(auth);
    refresh();
}

export async function signOut(refresh: () => void) {
    await internalPost("/api/auth/sign-out", {});
    refresh();
}
