import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://forest-whisperer-api.vercel.app";
    return [
      { source: "/api/:path*", destination: `${apiUrl.replace(/\/$/, "")}/api/:path*` },
    ];
  },
};

export default nextConfig;
