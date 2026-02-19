import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy /api to FastAPI backend during local dev (backend runs on :8000)
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    return [{ source: "/api/:path*", destination: `${apiUrl.replace(/\/$/, "")}/api/:path*` }];
  },
};

export default nextConfig;
