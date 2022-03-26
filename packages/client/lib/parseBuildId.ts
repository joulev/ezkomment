import { BuildInfo } from "@client/types/utils.type";

/**
 * Parse the buildId of the current app build. The buildId is customised as hash-timestamp, see more
 * in `next.config.mjs`.
 *
 * @note Update this function if the buildId format changes.
 *
 * @param buildId The buildId of the current build.
 * @returns The git hash and timestamp of the build
 */
export default function parseBuildId(buildId: string): BuildInfo {
    if (process.env.NODE_ENV === "development") return { hash: "", timestamp: 0 };
    const [hash, unixTime] = buildId.split("-");
    return {
        hash,
        timestamp: parseInt(unixTime) * 1000,
    };
}
