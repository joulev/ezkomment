import "client-only";
import { createContext, useContext } from "react";
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
import useSWR, { KeyedMutator } from "swr";
import { internalPost, internalSWRGenerator } from "./internal-fetch";
import { ClientUser } from "~/types/server";

const firebaseApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});
const auth = getAuth(firebaseApp);
export const githubProvider = new GithubAuthProvider();
export const googleProvider = new GoogleAuthProvider();
type Provider = GithubAuthProvider | GoogleAuthProvider;

export type AppAuth = {
    user: ClientUser | undefined;
    mutateUser: KeyedMutator<ClientUser>;
};

export const AuthContext = createContext<AppAuth>({
    user: undefined,
    mutateUser: async () => undefined,
});

export function useAuthInit(): AppAuth {
    const { data: user, mutate: mutateUser } = useSWR(
        "/api/user",
        internalSWRGenerator<ClientUser>(),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            onError() {
                mutateUser(undefined, false);
            },
        }
    );
    return { user, mutateUser };
}

export function useAuth() {
    return useContext(AuthContext);
}

export async function signIn({ mutateUser }: AppAuth, provider: Provider) {
    await setPersistence(auth, inMemoryPersistence);
    const credentials = await signInWithPopup(auth, provider);
    const idToken = await credentials.user.getIdToken();
    await internalPost("/api/auth/sign-in", { idToken });
    await _signOut(auth);
    await mutateUser();
}

export async function signOut({ mutateUser }: AppAuth) {
    await internalPost("/api/auth/sign-out", {});
    await mutateUser();
}
