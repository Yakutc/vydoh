import type { NextConfig } from "next";

// GitHub Pages project sites live under /<repo>; local, Cloudflare and a
// custom domain build with an empty base path.
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || undefined;

const nextConfig: NextConfig = {
  // Fully static: `npm run build` writes `out/`, ready for Cloudflare Pages,
  // Netlify, GitHub Pages or any static host.
  output: "export",
  basePath,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
