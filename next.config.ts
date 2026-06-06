import type { NextConfig } from "next";

const getRepositoryName = () => {
  if (process.env.GITHUB_REPOSITORY) {
    const parts = process.env.GITHUB_REPOSITORY.split("/");
    return parts.length > 1 ? `/${parts[1]}` : "";
  }
  return "";
};

const nextConfig: NextConfig = {
  allowedDevOrigins: ["some-years-punch.loca.lt"],
  output: "export",
  images: {
    unoptimized: true,
  },
  // GitHub Pages 部署時若在子目錄下，動態從 GITHUB_REPOSITORY 環境變數解析倉庫名稱
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || (process.env.GITHUB_ACTIONS ? getRepositoryName() : ""),
};

export default nextConfig;
