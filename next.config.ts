import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2ol7oe51mr4n9.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    rules: {
      // Keep theme token CSS out of the Tailwind loader so `html.dark`
      // variable maps are not stripped during processing.
      "**/theme-tokens.css": {
        loaders: [],
        as: "*.css",
      },
      "**/final-cta.css": {
        loaders: [],
        as: "*.css",
      },
      "**/vante-ribbon.css": {
        loaders: [],
        as: "*.css",
      },
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
