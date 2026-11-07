import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 95],
    imageSizes: [32, 48, 64, 96, 128, 156, 186, 256, 384, 465, 641],
  },
};

export default nextConfig;
