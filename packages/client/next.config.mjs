import { execSync } from "child_process";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: () => {
    // If change this, also update lib/parseBuildId.ts accordingly
    const time = execSync("git log -1 --pretty=format:%ct").toString();
    const hash = execSync("git rev-parse --short HEAD").toString().trim();
    return `${hash}-${time}`;
  },
};

export default nextConfig;
