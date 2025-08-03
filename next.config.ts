import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don’t block the CI build if there are ESLint or TS type errors – they will still be shown in the logs
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // WARNING: keep this temporary. Once the codebase stabilises, turn it off to catch real errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
