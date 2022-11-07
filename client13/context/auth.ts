import { createContext } from "react";
import { KeyedMutator } from "swr";
import { ClientUser, Notification } from "~/types/server";

export type AppAuth = {
    user: ClientUser | undefined;
    mutate: KeyedMutator<ClientUser | undefined>;
    notifications: Notification[] | undefined;
    mutateNotifications: KeyedMutator<Notification[] | undefined>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AppAuth>({
    user: undefined,
    mutate: async () => undefined,
    notifications: undefined,
    mutateNotifications: async () => undefined,
    loading: true,
    setLoading: () => undefined,
});

export default AuthContext;
