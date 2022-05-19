import { GithubAuthProvider, GoogleAuthProvider, User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

export type Provider = GithubAuthProvider | GoogleAuthProvider;

export type AppAuth = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};
