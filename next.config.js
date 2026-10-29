/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skills now lives as a tab on the About page.
  async redirects() {
    return [{ source: '/skills', destination: '/about?tab=skills', permanent: true }]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-699441ce0cfb40449cc458823a3f1ed2.r2.dev',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig