import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

import { ClientUser } from "~/types/server";

export type Provider = GithubAuthProvider | GoogleAuthProvider;

export type AppAuth = {
    user: ClientUser | null;
    setUser: Dispatch<SetStateAction<ClientUser | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};
