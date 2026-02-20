import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only proxy /api when NEXT_PUBLIC_API_URL is set (local dev with separate backend).
  // On Vercel, leave unset so /api/* is served by Python serverless functions.
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return [];
    return [
      { source: "/api/:path*", destination: `${apiUrl.replace(/\/$/, "")}/api/:path*` },
    ];
  },
};

export default nextConfig;
