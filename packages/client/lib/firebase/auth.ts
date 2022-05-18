import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    getAuth,
    isSignInWithEmailLink,
    linkWithPopup,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    signInWithPopup,
    unlink,
} from "firebase/auth";

import { AppAuth } from "@client/types/auth.type";

import { INVALID_EMAIL_LINK, NOT_AUTHENTICATED } from "../errors";
import firebaseApp from "./app";

const auth = getAuth(firebaseApp);
const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();

export async function signInGitHub({ setLoading }: AppAuth) {
    setLoading(true);
    await signInWithPopup(auth, githubProvider);
    setLoading(false);
}

export async function linkGitHub({ setLoading }: AppAuth) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await linkWithPopup(auth.currentUser, githubProvider);
    setLoading(false);
}

export async function unlinkGitHub({ setLoading }: AppAuth) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await unlink(auth.currentUser, githubProvider.providerId);
    setLoading(false);
}

export async function signInGoogle({ setLoading }: AppAuth) {
    setLoading(true);
    await signInWithPopup(auth, googleProvider);
    setLoading(false);
}

export async function linkGoogle({ setLoading }: AppAuth) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await linkWithPopup(auth.currentUser, googleProvider);
    setLoading(false);
}

export async function unlinkGoogle({ setLoading }: AppAuth) {
    setLoading(true);
    if (!auth.currentUser) throw NOT_AUTHENTICATED;
    await unlink(auth.currentUser, googleProvider.providerId);
    setLoading(false);
}

export async function signInEmailLink({ setLoading }: AppAuth, email: string) {
    setLoading(true);
    await sendSignInLinkToEmail(auth, email, {
        url:
            process.env.NODE_ENV === "development"
                ? "http://localhost:3000/auth/emaillink"
                : "https://test.joulev.dev/auth/emaillink",
        handleCodeInApp: true,
    });
    localStorage.setItem("emailLinkSignIn", email);
    setLoading(false);
}

export async function finaliseSignInEmailLink({ setLoading }: AppAuth, href: string) {
    setLoading(true);
    if (!isSignInWithEmailLink(auth, href)) throw INVALID_EMAIL_LINK;
    let email = localStorage.getItem("emailLinkSignIn");
    while (!email) email = window.prompt("Please enter your email address for confirmation.");
    await signInWithEmailLink(auth, email, href);
    localStorage.removeItem("emailLinkSignIn");
    setLoading(false);
}

export async function signOut({ setLoading }: AppAuth) {
    setLoading(true);
    await firebaseSignOut(auth);
    setLoading(false);
}
