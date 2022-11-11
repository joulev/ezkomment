"use client";
import "client-only";

import NProgress from "nprogress";
import { createContext, useContext, useEffect, useState } from "react";

type ContextType = {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoadingStateContext = createContext<ContextType>({
    loading: false,
    setLoading: () => {},
});

function startProgress() {
    if (NProgress.isStarted()) NProgress.inc();
    else NProgress.start();
}
function endProgress() {
    NProgress.done();
}

export function useLoadingStateInit() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (loading) startProgress();
        else endProgress();
    });
    return { loading, setLoading };
}

export const useLoadingState = () => useContext(LoadingStateContext);
