import { createContext } from "react";

import { AppAuth } from "~/types/client/auth.type";

const AuthContext = createContext<AppAuth>({
    user: undefined,
    mutate: async () => undefined,
    loading: true,
    setLoading: () => undefined,
});

export default AuthContext;
