import NProgress from "nprogress";

export function startProgress() {
    if (NProgress.isStarted()) NProgress.inc();
    else NProgress.start();
}

export function endProgress() {
    NProgress.done();
}
