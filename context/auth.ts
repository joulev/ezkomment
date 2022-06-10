import { createContext } from "react";

import { AppAuth } from "@client/types/auth.type";

const AuthContext = createContext<AppAuth>({
    user: null,
    setUser: () => {},
    loading: true,
    setLoading: () => {},
});

export default AuthContext;
