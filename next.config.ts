import type { NextConfig } from "next";

const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  allowedDevOrigins: ["127.0.0.1", "localhost"],
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
