// @ts-check

/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["mdx", "tsx", "ts"],
  images: { remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }] },
  experimental: { appDir: true },
  redirects: async () => [
    {
      source: "/docs",
      destination: "/docs/tutorial/getting-started",
      permanent: true,
    },
    {
      source: "/docs/getting-started",
      destination: "/docs/tutorial/getting-started",
      permanent: true,
    },
    {
      source: "/app", // likely will change this when authentication is added
      destination: "/app/dashboard",
      permanent: true,
    },
    {
      source: "/orbital/liftoff-video",
      destination: "https://drive.google.com/file/d/1wkvvl-EeYFRbqdmqBBfFu5B-NO_vVxFK/view",
      permanent: false,
    },
    {
      source: "/orbital/ms1-video",
      destination: "https://drive.google.com/file/d/1TE0dBZ3PkU9FSMSvTEMnb3dLs9U4CUyl/view",
      permanent: false,
    },
    {
      source: "/orbital/ms2-video",
      destination: "https://drive.google.com/file/d/1gyDeqEbk3Mu6ZZqLgoa06pH4UgrewekD/view",
      permanent: false,
    },
    {
      source: "/orbital/ms3-video",
      destination: "https://drive.google.com/file/d/1yAn4dCjKpKoHwNMfsfeS3Mu3pzJZYzgZ/view",
      permanent: false,
    },
    {
      source: "/orbital/splashdown-video",
      destination: "https://drive.google.com/file/d/1nN_ATlpWglU4tJx755Scoyp5OmZRWPOu/view",
      // hard subtitle: https://drive.google.com/file/d/1MtPL8QXRHxvF2OrYWMEhxprVz_3kYl95/view
      permanent: false,
    },
    {
      source: "/orbital/splashdown-source",
      destination: "https://github.com/joulev/ezkomment/archive/refs/tags/v1.0.0.zip",
      permanent: false,
    },
  ],
  rewrites: async () => [
    {
      source: "/embed/:slug*",
      destination: "/api/embed/:slug*",
    },
  ],
  webpack: config => {
    config.module.rules.push({ test: /\.mdx?$/, type: "asset/source" });
    config.module.rules.push({ test: /\.html$/, type: "asset/source" });
    return config;
  },
};

export default nextConfig;
