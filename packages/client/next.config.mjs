import { execSync } from "child_process";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: () => {
    const time = execSync("git log -1 --pretty=format:%cI").toString();
    const hash = execSync("git rev-parse HEAD").toString().trim();
    return `${hash}@${time}`;
  },
};

export default nextConfig;
