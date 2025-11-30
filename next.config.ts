import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable Next's image optimization in development to avoid upstream proxy timeouts.
  // In production you can remove or set this to false to enable optimization.
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    // allow remote images from Cloudinary via pattern matching
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

export default nextConfig;
