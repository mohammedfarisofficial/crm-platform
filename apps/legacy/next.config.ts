import type { NextConfig } from "next";

const GATEWAY_BASE_URL = process.env.GATEWAY_BASE_URL ?? "http://localhost:6060";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${GATEWAY_BASE_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
