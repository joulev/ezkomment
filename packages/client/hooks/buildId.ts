import { useEffect, useState } from "react";

import { BuildInfo } from "@client/types/utils.type";

function parseBuildId(buildId: string): BuildInfo {
    if (process.env.NODE_ENV === "development") return { hash: "", timestamp: 0 };
    const [hash, unixTime] = buildId.split("-");
    return {
        hash,
        timestamp: parseInt(unixTime) * 1000,
    };
}

/**
 * Get the current `buildId` of the current app build. It is apparently stored in the `#__NEXT_DATA__`
 * element in the DOM. It is not documented though, so there is no guarantee this will work in the
 * future. For now it is perfectly good, however.
 *
 * @returns The git hash and timestamp of the build
 */
export default function useBuildId() {
    const [buildId, setBuildId] = useState<BuildInfo | null>(null);
    useEffect(() => {
        const getBuildId: string = JSON.parse(
            document.querySelector("#__NEXT_DATA__")?.textContent as string
        ).buildId;
        setBuildId(parseBuildId(getBuildId));
    }, []);
    return buildId;
}
