import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/IconSnap',   
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
