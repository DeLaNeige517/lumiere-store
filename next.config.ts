import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 固定构建根目录，避免上层工作区 package.json 干扰
  outputFileTracingRoot: process.cwd(),
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
