/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow the production build to continue even if there are ESLint or TS errors.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // WARNING: do not leave this on forever – just until the codebase stabilises
    ignoreBuildErrors: true,
  },
};

export default nextConfig; 