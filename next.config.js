/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    return config;
  },
};

module.exports = nextConfig;
