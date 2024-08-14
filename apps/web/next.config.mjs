/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gdb.rferl.org',
      },
      {
        protocol: 'https',
        hostname: 'www.radiosvoboda.org',
      },
    ],
  },
};

export default nextConfig;
