import rehypeSlug from "rehype-slug";
import remarkPrism from "remark-prism";
import remarkToc from "remark-toc";

/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["mdx", "tsx", "ts"],
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  redirects: async () => [
    {
      source: "/docs",
      destination: "/docs/tutorial/getting-started",
      permanent: true,
    },
    {
      source: "/app", // likely will change this when authentication is added
      destination: "/app/dashboard",
      permanent: true,
    },
  ],
  rewrites: async () => [
    {
      source: "/embed/:slug*",
      destination: "/api/embed/:slug*",
    },
  ],
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          /** @type {import("@mdx-js/loader").Options} */
          options: {
            rehypePlugins: [rehypeSlug],
            remarkPlugins: [remarkPrism, remarkToc],
            providerImportSource: "@mdx-js/react",
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
