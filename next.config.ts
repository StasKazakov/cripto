import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/cripto',
  assetPrefix: '/cripto',
  cacheComponents: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
