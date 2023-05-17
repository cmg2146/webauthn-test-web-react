/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: '.next',
  reactStrictMode: true,
  images: {
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
