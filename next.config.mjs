/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true /** babel 삭제 후 SWC 활성화, 빌드 속도 개선 */,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['ojajae-s3-file-store.s3.ap-northeast-2.amazonaws.com'],
    
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
