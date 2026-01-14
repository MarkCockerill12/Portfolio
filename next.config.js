/** @type {import('next').NextConfig} */
const nextConfig = {
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