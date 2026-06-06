import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["some-years-punch.loca.lt"],
  output: "export",
  images: {
    unoptimized: true,
  },
  // GitHub Pages 部署時若在子目錄下，需要動態設定 basePath
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
