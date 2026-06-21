import type { NextConfig } from "next";

// GitHub Pages はリポジトリ名のサブパス (/pattern-speak) で配信されるため、
// 本番ビルド時のみ basePath / assetPrefix を付与する。ローカルの dev では付けない。
const isProd = process.env.NODE_ENV === "production";
const repoName = "pattern-speak";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(isProd
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`
      }
    : {})
};

export default nextConfig;
