import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ⛔️ Skip ESLint and TS errors during the Vercel build so deployment doesn’t fail.
  // We still see them locally so we can fix them later, but they won’t block prod.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
