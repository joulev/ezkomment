import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

export type AppAuth = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};
