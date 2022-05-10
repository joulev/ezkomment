import { execSync } from "child_process";

/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["mdx", "tsx"],
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  generateBuildId: () => {
    // If change this, also update lib/parseBuildId.ts accordingly
    const time = execSync("git log -1 --pretty=format:%ct").toString();
    const hash = execSync("git rev-parse --short HEAD").toString().trim();
    return `${hash}-${time}`;
  },
  redirects: async () => [
    {
      source: "/docs",
      destination: "/docs/getting-started",
      permanent: true,
    },
    {
      source: "/app", // likely will change this when authentication is added
      destination: "/app/dashboard",
      permanent: true,
    },
  ],
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx$/, // no need of .md
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          /** @type {import("@mdx-js/loader").Options} */
          options: {},
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
