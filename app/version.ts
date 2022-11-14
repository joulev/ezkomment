const env = process.env.NODE_ENV;
const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
const pkgVersion = process.env.NEXT_PUBLIC_APP_VERSION ?? "0.0.0";
const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? "unknown";

function getVersion(): { href: string | undefined; version: string } {
    // dev mode
    if (env === "development" || env === "test")
        return {
            href: undefined,
            version: `v${pkgVersion}+dev`,
        };
    // local prod mode
    if (!vercelEnv)
        return {
            href: undefined,
            version: `v${pkgVersion}+localbuild`,
        };
    // production build
    if (vercelEnv === "production")
        return {
            href: `https://github.com/joulev/ezkomment/releases/tag/v${pkgVersion}`,
            version: `v${pkgVersion}`,
        };
    // preview build
    return {
        href: `https://github.com/joulev/ezkomment/commit/${sha}`,
        version: `v${pkgVersion}+build.${sha.substring(0, 7)}`,
    };
}

const version = getVersion();

export default version;
