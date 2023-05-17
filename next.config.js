/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // needed for static file routing to work properly for export. Will only work with port 80 and 443 (production only).
  trailingSlash: true,
  images: {
    // needed to get export working
    unoptimized: true
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId },
  ) {
    return {
      ...defaultPathMap,
      '/': { page: '/passkeys' }
    };
  },
}

module.exports = nextConfig
