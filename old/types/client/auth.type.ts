import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";
import { KeyedMutator } from "swr";

import { ClientUser, Notification } from "~/old/types/server";

export type Provider = GithubAuthProvider | GoogleAuthProvider;

export type AppAuth = {
    user: ClientUser | undefined;
    mutate: KeyedMutator<ClientUser | undefined>;
    notifications: Notification[] | undefined;
    mutateNotifications: KeyedMutator<Notification[] | undefined>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};
