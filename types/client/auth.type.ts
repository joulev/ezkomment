import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";
import { KeyedMutator } from "swr";

import { ClientUser } from "~/types/server";

export type Provider = GithubAuthProvider | GoogleAuthProvider;

export type AppAuth = {
    user: ClientUser | undefined;
    mutate: KeyedMutator<ClientUser | undefined>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};
