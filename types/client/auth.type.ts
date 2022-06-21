import { User as FirebaseUser, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

import { Site } from "~/types/server";

export type Provider = GithubAuthProvider | GoogleAuthProvider;

export type User = FirebaseUser & { sites: Site[] };

export type AppAuth = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};
