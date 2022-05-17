import { Dispatch, SetStateAction } from "react";

export type AppUser = {
    uid: string;
    email: string | null;
} | null;

export type AppAuth = {
    user: AppUser;
    setUser: Dispatch<SetStateAction<AppUser>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};
