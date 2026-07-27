import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/projeler",
        destination: "/tasarim-yaklasimi",
        permanent: true,
      },
      {
        source: "/projeler/:slug",
        destination: "/tasarim-yaklasimi",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
